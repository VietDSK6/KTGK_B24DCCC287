export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  category: 'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác';
  thumbnail: string;
  description: string;
}
