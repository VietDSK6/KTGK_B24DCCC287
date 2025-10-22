import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { Post } from './types/Post';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import PostEdit from './components/PostEdit';
import './App.css';

import pomodoroImg from './assets/pomodoro.jpg';
import bitcoinImg from './assets/bitcoin.jpg';
import nhinAnImg from './assets/nhin-an.jpg';

function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      "id": "1",
      "title": "Tăng hiệu suất làm việc với phương pháp Pomodoro",
      "author": "Phạm Minh D",
      "date": "2025-10-21",
      "content": "Phương pháp Pomodoro là một kỹ thuật quản lý thời gian được phát triển bởi Francesco Cirillo. Kỹ thuật này sử dụng một bộ đếm thời gian để chia công việc thành các khoảng thời gian tập trung ngắn, thường là 25 phút, xen kẽ với những khoảng nghỉ ngắn...",
      "category": "Đời sống",
      "thumbnail": pomodoroImg,
      "description": "Tìm hiểu phương pháp Pomodoro, một kỹ thuật quản lý thời gian đơn giản nhưng hiệu quả giúp bạn tập trung cao độ và hoàn thành công việc nhanh chóng.",
    },
    {
      "id": "2",
      "title": "Bitcoin là gì? Giới thiệu cho người mới bắt đầu",
      "author": "Hoàng Thị E",
      "date": "2025-10-22",
      "content": "Bitcoin là một loại tiền tệ kỹ thuật số phi tập trung, được tạo ra vào năm 2009. Nó cho phép người dùng giao dịch trực tiếp với nhau mà không cần thông qua một tổ chức trung gian như ngân hàng. Mọi giao dịch đều được ghi lại trên một sổ cái công khai gọi là blockchain...",
      "category": "Công nghệ",
      "thumbnail": bitcoinImg,
      "description": "Bài viết này giải thích một cách đơn giản về Bitcoin, cách nó hoạt động và tại sao nó lại trở thành một chủ đề nóng trong thế giới tài chính và công nghệ.",
    },
    {
      "id": "3",
      "title": "Nhịn ăn gián đoạn: Lợi ích và cách thực hiện",
      "author": "Vũ Văn F",
      "date": "2025-10-23",
      "content": "Nhịn ăn gián đoạn (Intermittent Fasting) là một mô hình ăn uống xoay vòng giữa các giai đoạn ăn và nhịn. Thay vì quy định bạn nên ăn gì, nó tập trung vào việc khi nào bạn nên ăn. Các phương pháp phổ biến bao gồm 16/8, 5:2...",
      "category": "Đời sống",
      "thumbnail": nhinAnImg,
      "description": "Khám phá các lợi ích sức khỏe của việc nhịn ăn gián đoạn, từ giảm cân đến cải thiện sức khỏe não bộ, cùng với hướng dẫn các phương pháp phổ biến.",
    },
    {
      "id": "4",
      "title": "Clean Code: Viết mã sạch hơn cho lập trình viên",
      "author": "Đặng Hoàng G",
      "date": "2025-10-22",
      "content": "Viết mã không chỉ là để máy tính hiểu, mà còn là để con người đọc. 'Clean Code' là một tập hợp các nguyên tắc và thực hành tốt nhất giúp mã nguồn của bạn trở nên dễ đọc, dễ bảo trì và dễ mở rộng hơn trong tương lai...",
      "category": "Công nghệ",
      "thumbnail": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
      "description": "Tìm hiểu các nguyên tắc cốt lõi của Clean Code và cách áp dụng chúng để cải thiện chất lượng mã nguồn, giúp bạn trở thành một lập trình viên chuyên nghiệp hơn."
    },
    {
      "id": "5",
      "title": "Mùa thu Hà Nội - Nét lãng mạn không thể chối từ",
      "author": "Lê Thu H",
      "date": "2025-10-21",
      "content": "Khi những cơn gió heo may bắt đầu thổi, Hà Nội khoác lên mình chiếc áo mùa thu đầy quyến rũ. Đây là thời điểm thủ đô trở nên đẹp nhất với mùi hoa sữa nồng nàn, những con đường trải đầy lá vàng và gánh hàng rong chở đầy cốm xanh...",
      "category": "Du lịch",
      "thumbnail": "https://statics.vinpearl.com/mua-thu-ha-noi-thumb_1685027028.jpg",
      "description": "Khám phá vẻ đẹp lãng mạn của mùa thu Hà Nội qua những con đường, góc phố quen thuộc và những món quà đặc trưng chỉ có trong tiết trời se lạnh."
    },
    {
      "id": "6",
      "title": "Bún chả - Tinh hoa ẩm thực đất kinh kỳ",
      "author": "Trần Văn I",
      "date": "2025-10-20",
      "content": "Bún chả là một trong những món ăn đặc sắc và nổi tiếng nhất của Hà Nội. Một suất ăn đầy đủ bao gồm chả viên và chả miếng nướng trên than hoa, ăn kèm với bún tươi, rau sống và nước chấm chua ngọt đậm đà hương vị...",
      "category": "Ẩm thực",
      "thumbnail": "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_3_4_638135494683018162_cach-lam-bun-cha-bang-noi-chien-khong-dau-1.jpg",
      "description": "Cùng tìm hiểu về sức hấp dẫn của món bún chả Hà Nội, từ cách chế biến công phu đến hương vị hài hòa đã làm say lòng biết bao thực khách trong và ngoài nước."
    },
    {
      "id": "7",
      "title": "Chủ nghĩa tối giản (Minimalism): Sống nhẹ nhàng hơn",
      "author": "Nguyễn Ngọc K",
      "date": "2025-10-23",
      "content": "Chủ nghĩa tối giản không chỉ là vứt bỏ đồ đạc, mà là một phong cách sống tập trung vào những gì thực sự quan trọng. Bằng cách loại bỏ những thứ không cần thiết, bạn có thể giải phóng không gian, thời gian và tâm trí để theo đuổi đam mê...",
      "category": "Đời sống",
      "thumbnail": "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800",
      "description": "Khám phá lợi ích của chủ nghĩa tối giản và cách bạn có thể bắt đầu hành trình sống gọn gàng, ý nghĩa và hạnh phúc hơn ngay từ hôm nay."
    },
  ]);

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleCreatePost = (postData: Omit<Post, 'id'>) => {
    const newPost: Post = {
      ...postData,
      id: String(posts.length + 1),
    };
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (id: string, postData: Omit<Post, 'id'>) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...postData, id } : post
    ));
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<PostList posts={posts} onDelete={handleDeletePost} />} />
          <Route path="/posts" element={<PostList posts={posts} onDelete={handleDeletePost} />} />
          <Route 
            path="/create" 
            element={<PostForm onSubmit={handleCreatePost} mode="create" />} 
          />
          <Route 
            path="/posts/:id" 
            element={<PostDetail posts={posts} onDelete={handleDeletePost} />} 
          />
          <Route 
            path="/posts/edit/:id" 
            element={<PostEdit posts={posts} onUpdate={handleUpdatePost} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
