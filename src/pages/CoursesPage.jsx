import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => {navigate(`/course/${course.id}`)}} className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
      <img 
        src={course.image || "/api/placeholder/400/225"} 
        alt={course.title} 
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-500">{course.level}</span>
          <span className="text-sm font-medium text-gray-500">{course.duration}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{course.title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={course.instructor.avatar || "/api/placeholder/40/40"} 
              alt={course.instructor.name} 
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-2 text-xs text-gray-600">{course.instructor.name}</span>
          </div>
          <span className="font-medium text-orange-500">{course.price}</span>
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dữ liệu khóa học mẫu
  const coursesData = [
    {
      id: 1,
      title: "Academic Writing for Research Papers",
      description: "Learn how to write research papers with proper academic style and formatting.",
      image: "/api/placeholder/400/225",
      level: "Intermediate",
      duration: "8 weeks",
      price: "1,800,000 VND",
      category: "writing",
      instructor: {
        name: "Dr. Sarah Johnson",
        avatar: "/api/placeholder/40/40"
      }
    },
    {
      id: 2,
      title: "English for Scientific Communication",
      description: "Improve your ability to communicate scientific concepts in English.",
      image: "/api/placeholder/400/225",
      level: "Advanced",
      duration: "10 weeks",
      price: "2,500,000 VND",
      category: "speaking",
      instructor: {
        name: "Prof. Robert Chen",
        avatar: "/api/placeholder/40/40"
      }
    },
    {
      id: 3,
      title: "Academic Vocabulary Enhancement",
      description: "Expand your academic vocabulary with this intensive course.",
      image: "/api/placeholder/400/225",
      level: "Beginner",
      duration: "6 weeks",
      price: "1,200,000 VND",
      category: "vocabulary",
      instructor: {
        name: "Emma Williams",
        avatar: "/api/placeholder/40/40"
      }
    },
    {
      id: 4,
      title: "Critical Reading of Academic Texts",
      description: "Develop strategies for efficiently reading and analyzing academic literature.",
      image: "/api/placeholder/400/225",
      level: "Intermediate",
      duration: "7 weeks",
      price: "1,500,000 VND",
      category: "reading",
      instructor: {
        name: "Dr. Michael Lee",
        avatar: "/api/placeholder/40/40"
      }
    },
    {
      id: 5,
      title: "Academic Presentation Skills",
      description: "Master the art of presenting academic research in English.",
      image: "/api/placeholder/400/225",
      level: "Advanced",
      duration: "5 weeks",
      price: "1,700,000 VND",
      category: "speaking",
      instructor: {
        name: "Prof. Lisa Garcia",
        avatar: "/api/placeholder/40/40"
      }
    },
    {
      id: 6,
      title: "Grammar for Academic Writing",
      description: "Focus on advanced grammar structures commonly used in academic writing.",
      image: "/api/placeholder/400/225",
      level: "Intermediate",
      duration: "8 weeks",
      price: "1,600,000 VND",
      category: "writing",
      instructor: {
        name: "David Thompson",
        avatar: "/api/placeholder/40/40"
      }
    }
  ];
  
  // Lọc và tìm kiếm khóa học
  const filteredCourses = coursesData.filter(course => {
    const matchesTab = activeTab === 'all' || course.category === activeTab;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Khóa học tiếng Anh học thuật</h1>
        
        {/* Thanh tìm kiếm */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-orange-500 focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
                  activeTab === 'all'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Tất cả
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('writing')}
                className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
                  activeTab === 'writing'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Writing
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('speaking')}
                className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
                  activeTab === 'speaking'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Speaking
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('reading')}
                className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
                  activeTab === 'reading'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Reading
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('vocabulary')}
                className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
                  activeTab === 'vocabulary'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Vocabulary
              </button>
            </li>
          </ul>
        </div>
        
        {/* Danh sách khóa học */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Không tìm thấy khóa học phù hợp.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Course */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:w-1/2 md:pr-6">
            <h2 className="mb-4 text-xl font-semibold">Khóa học nổi bật</h2>
            <h3 className="mb-2 text-lg font-medium">IELTS Academic Writing Mastery</h3>
            <p className="mb-4 text-gray-600">
              Khóa học chuyên sâu giúp bạn cải thiện kỹ năng viết học thuật theo tiêu chuẩn IELTS. Bạn sẽ học cách phân tích đề bài, lập dàn ý và viết các bài luận có cấu trúc rõ ràng và thuyết phục.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>10 tuần học online</span>
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Giảng viên có chứng chỉ IELTS 8.5</span>
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Phản hồi chi tiết cho mỗi bài viết</span>
              </li>
            </ul>
            <Link to="/courses/featured" className="inline-block rounded-full bg-orange-500 px-6 py-2 font-medium text-white hover:bg-orange-600">
              Tìm hiểu thêm
            </Link>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/api/placeholder/600/350" 
              alt="IELTS Academic Writing Course" 
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
