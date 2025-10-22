import { useState, useEffect } from 'react';
import type { Post } from '../types/Post';
import './HeroSlider.css';

interface HeroSliderProps {
  posts: Post[];
}

const HeroSlider = ({ posts }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredPosts = posts.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (featuredPosts.length === 0) return null;

  return (
    <div className="hero-slider">
      {featuredPosts.map((post, index) => (
        <div
          key={post.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${post.thumbnail})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="hero-category">{post.category}</span>
            <h1 className="hero-title">{post.title}</h1>
            <p className="hero-description">{post.description}</p>
            <div className="hero-meta">
              <div className="hero-author">
                <div className="author-avatar">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </div>
              <span className="hero-date">{post.date}</span>
              <span className="hero-read-time">10 phút đọc</span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="hero-dots">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
