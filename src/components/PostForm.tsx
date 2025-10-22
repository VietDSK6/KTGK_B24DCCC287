import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/Post';
import './PostForm.css';

interface PostFormProps {
  onSubmit: (post: Omit<Post, 'id'>) => void;
  initialData?: Post;
  mode: 'create' | 'edit';
}

const PostForm = ({ onSubmit, initialData, mode }: PostFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    thumbnail: initialData?.thumbnail || '',
    content: initialData?.content || '',
    category: initialData?.category || 'Công nghệ' as const,
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    content: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors = {
      title: '',
      author: '',
      content: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Tác giả là bắt buộc';
    } else if (formData.author.trim().length < 3) {
      newErrors.author = 'Tên tác giả phải có ít nhất 3 ký tự';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    } else if (formData.content.trim().length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.author && !newErrors.content;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const postData = {
      ...formData,
      date: initialData?.date || new Date().toISOString().split('T')[0],
      description: formData.description || formData.content.substring(0, 150),
    };

    onSubmit(postData);
    
    if (mode === 'create') {
      alert('Đăng bài thành công!');
      navigate('/');
    } else {
      alert('Cập nhật thành công!');
      navigate(`/posts/${initialData?.id}`);
    }
  };

  const handleCancel = () => {
    if (mode === 'edit' && initialData) {
      navigate(`/posts/${initialData.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="post-form-container">
      <div className="post-form-header">
        <h1>{mode === 'create' ? 'Tạo bài viết mới' : 'Chỉnh sửa bài viết'}</h1>
        <p className="form-subtitle">
          {mode === 'create' 
            ? 'Chia sẻ câu chuyện, kiến thức và trải nghiệm của bạn với cộng đồng'
            : 'Cập nhật nội dung bài viết của bạn'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Tiêu đề <span className="required">*</span></label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Nhập tiêu đề bài viết (tối thiểu 10 ký tự)"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Tác giả <span className="required">*</span></label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
            placeholder="Nhập tên tác giả (tối thiểu 3 ký tự)"
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Thể loại <span className="required">*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Công nghệ">Công nghệ</option>
            <option value="Du lịch">Du lịch</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Đời sống">Đời sống</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">URL ảnh thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả ngắn</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả ngắn về bài viết (tùy chọn)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Nội dung <span className="required">*</span></label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={errors.content ? 'error' : ''}
            rows={12}
            placeholder="Nhập nội dung bài viết (tối thiểu 50 ký tự)"
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
          <div className="character-count">
            {formData.content.length} ký tự
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Hủy
          </button>
          <button type="submit" className="btn-submit">
            {mode === 'create' ? 'Đăng bài' : 'Cập nhật'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
