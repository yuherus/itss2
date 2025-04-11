import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        {icon}
      </div>
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative z-10 flex flex-col-reverse md:flex-row">
          <div className="w-full p-6 md:w-1/2 md:p-8">
            <h1 className="mb-4 text-3xl font-bold">G-Easy English</h1>
            <p className="mb-6 text-gray-600">
              G-Easy là một nền tảng công nghệ giáo dục đầy triển vọng và phát triển nhanh chóng tại Việt Nam. G-Easy là phần mềm học tiếng Anh học thuật giúp người học dễ dàng tiếp cận và hỗ trợ tiếng Anh. Hiện tại nó có hơn 13 triệu người dùng ở 131 quốc gia trên thế giới và có văn phòng ở Bồ Đào Nha, Canada, Ấn Độ, Indonesia và Nhật Bản.
            </p>
            <Link to="/about" className="inline-block rounded-full border border-orange-500 px-6 py-2 font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white">
              Xem chi tiết
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/api/placeholder/600/400" 
              alt="Student studying" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="rounded-lg bg-white p-6 shadow-md md:p-8">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">G-Easy English</h2>
          <p className="text-gray-600">
            Chúng tôi cung cấp các công cụ và tài nguyên học thuật giúp nâng cao kỹ năng tiếng Anh học thuật của bạn một cách nhanh chóng và hiệu quả.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <FeatureCard 
            icon={<svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
            title="Từ điển chuyên ngành"
            description="Tra từ điển học thuật"
          />
          <FeatureCard 
            icon={<svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            title="Tài liệu chuyên ngành"
            description="Tài liệu học thuật"
          />
          <FeatureCard 
            icon={<svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
            title="Khóa học Online"
            description="Học online hiệu quả"
          />
          <FeatureCard 
            icon={<svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            title="Quản lý tài khoản"
            description="Quản lý tài khoản"
          />
          <FeatureCard 
            icon={<svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            title="Tự động nhắc nhở"
            description="Thời gian học tập hiệu quả"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="rounded-lg bg-white p-6 shadow-md">
        <div className="text-center text-gray-600">
          <p className="text-xs">© 2023 G-Easy English. All rights reserved.</p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Link to="/about" className="text-sm text-gray-500 hover:text-orange-500">About</Link>
          <Link to="/courses" className="text-sm text-gray-500 hover:text-orange-500">Courses</Link>
          <Link to="/materials" className="text-sm text-gray-500 hover:text-orange-500">Materials</Link>
          <Link to="/translate" className="text-sm text-gray-500 hover:text-orange-500">Translate</Link>
          <Link to="/contact" className="text-sm text-gray-500 hover:text-orange-500">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
export default HomePage;
