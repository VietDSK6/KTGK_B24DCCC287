import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types/Post';
import PostCard from './PostCard';
import HeroSlider from './HeroSlider';
import './PostList.css';

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostList = ({ posts, onDelete }: PostListProps) => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const categories = ['Tất cả', 'Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Khác'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <HeroSlider posts={posts} />
      
      <div className="post-list-container">
        <div className="post-list-header">
          <div className="header-top">
            <h2>Blog</h2>
            <Link to="/create" className="btn-new-post">
              Viết bài mới
            </Link>
          </div>
          <p className="post-subtitle">
            Ở đây chúng tôi viết blog
          </p>
          
          <div className="post-list-actions">
            <div className="category-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="search-sort">
              <input
                type="text"
                placeholder="Tìm kiếm tiêu đề"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>Không tìm thấy bài viết nào.</p>
          </div>
        ) : (
          <div className="post-grid">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
