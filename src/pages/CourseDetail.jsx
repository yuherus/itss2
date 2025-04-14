import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real application, you would fetch this data from an API
  // For now, I'm creating sample data similar to your existing courses
  const courseData = {
    id: parseInt(courseId),
    title: "Academic Writing for Research Papers",
    description: "Learn how to write research papers with proper academic style and formatting. This comprehensive course covers everything from structuring your paper to citing sources correctly and developing a strong academic voice. You'll gain practical skills through regular writing assignments with detailed feedback.",
    image: "/images/writing_research_papers.jpg",
    level: "Intermediate",
    duration: "8 weeks",
    price: "1,800,000 VND",
    category: "writing",
    language: "English",
    startDate: "May 15, 2025",
    studentsEnrolled: 128,
    rating: 4.8,
    instructor: {
      name: "Dr. Sarah Johnson",
      avatar: "/images/avatar.png",
      title: "PhD in Applied Linguistics",
      bio: "Dr. Sarah Johnson has over 10 years of experience teaching academic writing at leading universities. Her research focuses on second language acquisition and academic discourse communities."
    },
    syllabus: [
      {
        week: 1,
        title: "Introduction to Academic Writing",
        topics: ["Understanding academic discourse", "Types of research papers", "Setting goals for your writing"]
      },
      {
        week: 2,
        title: "Research Methods and Literature Review",
        topics: ["Finding reliable sources", "Critical reading strategies", "Synthesizing information"]
      },
      {
        week: 3,
        title: "Structuring Your Paper",
        topics: ["Creating effective outlines", "Writing strong introductions", "Developing thesis statements"]
      },
      {
        week: 4,
        title: "Academic Language and Style",
        topics: ["Formal vs. informal language", "Discipline-specific terminology", "Clarity and conciseness"]
      },
      {
        week: 5,
        title: "Citations and References",
        topics: ["APA format", "In-text citations", "Creating a reference list"]
      },
      {
        week: 6,
        title: "Developing Arguments",
        topics: ["Building logical arguments", "Using evidence effectively", "Addressing counterarguments"]
      },
      {
        week: 7,
        title: "Editing and Proofreading",
        topics: ["Common grammar issues", "Self-editing strategies", "Peer review process"]
      },
      {
        week: 8,
        title: "Final Project",
        topics: ["Complete research paper", "Final presentation", "Course reflection"]
      }
    ],
    requirements: [
      "Intermediate English proficiency (IELTS 5.5+ or equivalent)",
      "Basic understanding of essay structure",
      "Access to academic journals through your institution"
    ],
    objectives: [
      "Develop skills to write well-structured research papers",
      "Learn proper citation and referencing techniques",
      "Improve academic vocabulary and style",
      "Gain confidence in communicating research findings"
    ]
  };

  // For demonstration purposes, showing similar courses
  const similarCourses = [
    {
      id: 6,
      title: "Grammar for Academic Writing",
      description: "Focus on advanced grammar structures commonly used in academic writing.",
      image: "/images/writing_research_papers.jpg",
      level: "Intermediate",
      duration: "8 weeks",
      price: "1,600,000 VND",
      instructor: {
        name: "David Thompson",
        avatar: "/images/avatar.png"
      }
    },
    {
      id: 2,
      title: "English for Scientific Communication",
      description: "Improve your ability to communicate scientific concepts in English.",
      image: "/images/writing_research_papers.jpg",
      level: "Advanced",
      duration: "10 weeks",
      price: "2,500,000 VND",
      instructor: {
        name: "Prof. Robert Chen",
        avatar: "/images/avatar.png"
      }
    }
  ];

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Không tìm thấy thông tin khóa học.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        <img 
          src={courseData.image} 
          alt={courseData.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium mr-3">{courseData.level}</span>
            <span className="text-sm font-medium">{courseData.duration}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{courseData.title}</h1>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center">
              <img 
                src={courseData.instructor.avatar} 
                alt={courseData.instructor.name} 
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="text-sm">{courseData.instructor.name}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm">{courseData.rating} (45 đánh giá)</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span className="text-sm">{courseData.studentsEnrolled} học viên</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="border-b px-6">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`inline-block px-4 py-4 border-b-2 rounded-t-lg ${
                      activeTab === 'overview'
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    Tổng quan
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('syllabus')}
                    className={`inline-block px-4 py-4 border-b-2 rounded-t-lg ${
                      activeTab === 'syllabus'
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    Nội dung
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('instructor')}
                    className={`inline-block px-4 py-4 border-b-2 rounded-t-lg ${
                      activeTab === 'instructor'
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    Giảng viên
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Giới thiệu khóa học</h2>
                  <p className="text-gray-700 mb-6">{courseData.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Bạn sẽ học được gì</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {courseData.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">Yêu cầu</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    {courseData.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">{requirement}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-3">Thông tin thêm</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                        <p className="font-medium">{courseData.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Ngôn ngữ</p>
                        <p className="font-medium">{courseData.language}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'syllabus' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>
                  <div className="space-y-4">
                    {courseData.syllabus.map((week) => (
                      <div key={week.week} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <h3 className="font-medium">Tuần {week.week}: {week.title}</h3>
                        </div>
                        <div className="p-4">
                          <ul className="space-y-2">
                            {week.topics.map((topic, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                                <span className="text-gray-700">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Về giảng viên</h2>
                  <div className="flex items-start mb-6">
                    <img
                      src={courseData.instructor.avatar}
                      alt={courseData.instructor.name}
                      className="h-20 w-20 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{courseData.instructor.name}</h3>
                      <p className="text-gray-500 mb-2">{courseData.instructor.title}</p>
                      <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-1 text-sm">4.9 (120 đánh giá)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{courseData.instructor.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Similar Courses */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Khóa học tương tự</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarCourses.map(course => (
                <div key={course.id} className="flex bg-white rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{course.instructor.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">{course.duration}</span>
                      <span className="text-sm font-medium text-orange-500">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-orange-500 mb-4">{courseData.price}</p>
            </div>
            
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium mb-4 hover:bg-orange-600 transition-colors">
              Đăng ký ngay
            </button>
            <button className="w-full bg-white border border-orange-500 text-orange-500 py-3 rounded-lg font-medium mb-6 hover:bg-orange-50 transition-colors">
              Thêm vào danh sách quan tâm
            </button>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Cấp độ</span>
                <span className="font-medium">{courseData.level}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Thời lượng</span>
                <span className="font-medium">{courseData.duration}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Ngôn ngữ</span>
                <span className="font-medium">{courseData.language}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Số học viên</span>
                <span className="font-medium">{courseData.studentsEnrolled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ngày bắt đầu</span>
                <span className="font-medium">{courseData.startDate}</span>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-center">Khóa học bao gồm</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm">24 bài học video</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm">16 bài tập thực hành</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm">Chứng chỉ hoàn thành</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm">Truy cập vĩnh viễn</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm">Hỗ trợ trực tuyến</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back to courses */}
      <div className="mt-8">
        <Link to="/courses" className="inline-flex items-center text-orange-500 hover:text-orange-600">
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Quay lại trang khóa học
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;