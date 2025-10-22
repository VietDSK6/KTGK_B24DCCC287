import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import type { Post } from '../types/Post';

interface PostEditProps {
  posts: Post[];
  onUpdate: (id: string, postData: Omit<Post, 'id'>) => void;
}

const PostEdit = ({ posts, onUpdate }: PostEditProps) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="post-not-found">
          <h1>Không tìm thấy bài viết</h1>
          <p>Bài viết bạn muốn chỉnh sửa không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    <PostForm
      onSubmit={(postData) => onUpdate(post.id, postData)}
      initialData={post}
      mode="edit"
    />
  );
};

export default PostEdit;
