import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Post } from '../types/Post';
import './PostDetail.css';

interface PostDetailProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostDetail = ({ posts, onDelete }: PostDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="post-not-found">
          <h1>Không tìm thấy bài viết</h1>
          <p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/" className="btn-back">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
      navigate('/');
    }
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <div className="header-image" style={{ backgroundImage: `url(${post.thumbnail})` }}>
          <div className="header-overlay"></div>
        </div>
        
        <div className="header-content">
          <span className="detail-category">{post.category}</span>
          <h1 className="detail-title">{post.title}</h1>
          
          <div className="detail-meta">
            <div className="meta-author">
              <div className="author-avatar">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <span className="meta-date">{post.date}</span>
            <span className="meta-read-time">10 mins read</span>
          </div>
        </div>
      </div>

      <div className="post-detail-body">
        <div className="post-detail-actions">
          <button onClick={() => navigate('/')} className="btn-back">
            Quay lại
          </button>
          <div className="action-group">
            <Link to={`/posts/edit/${post.id}`} className="btn-edit">
              Chỉnh sửa
            </Link>
            <button onClick={handleDelete} className="btn-delete">
              Xóa bài viết
            </button>
          </div>
        </div>

        <div className="post-detail-content">
          <p className="post-description-full">{post.description}</p>
          <div className="post-content">{post.content}</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
