import { Link } from 'react-router-dom';
import type { Post } from '../types/Post';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="post-card">
      <Link to={`/posts/${post.id}`} className="post-card-link">
        <div className="post-card-image">
          <img src={post.thumbnail} alt={post.title} />
          <span className="post-category">{post.category}</span>
        </div>
        <div className="post-card-content">
          <h3 className="post-title">{post.title}</h3>
          <div className="post-meta">
            <span className="post-author">{post.author}</span>
            <span className="post-date">{post.date}</span>
            <span className="post-read-time">10 phút đọc</span>
          </div>
          <p className="post-description">
            {post.description.substring(0, 100)}...
          </p>
        </div>
      </Link>
      <button onClick={handleDelete} className="btn-delete-hover">
        Xóa
      </button>
    </div>
  );
};

export default PostCard;
