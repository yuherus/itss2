import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [courseData, setCourseData] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [showQr, setShowQr] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      let { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructors (*),
          syllabus (* ,
          syllabus_topics (*, 
          lessons (*)
          )
          ),
          course_objectives (*),
          course_requirements (*)
        `)
        .eq("id", id);

      if (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } else {
        setCourseData(data[0]);
        console.log(data[0]);
      }
    };

    fetchCourses();
  }, [id]);

  // Sample data for similar courses (unchanged)
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

  // Toggle topic expansion
  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleSelectTopic = useCallback((lessonId) => {
    navigate(`/lession/${lessonId}`);
  }, [navigate]);

  // Xử lý khi bấm nút Đăng ký
  const handleRegisterClick = () => {
    setShowQr(true);
    setRegistered(false);
  };

  // Xử lý khi người dùng bấm "Đã quét xong"
  const handleScanComplete = async () => {
    // Lấy thông tin người dùng hiện tại
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('Người dùng chưa đăng nhập.');
      // Có thể hiển thị thông báo cho người dùng
      setShowQr(false);
      setRegistered(false);
      return;
    }

    // Dữ liệu cần chèn vào bảng user_courses
    const enrollmentData = {
      user_id: user.id,
      course_id: courseData.id, // Lấy course_id từ dữ liệu khóa học đã fetch
      enrollment_date: new Date().toISOString(), // Sử dụng thời gian hiện tại client
      // Hoặc dùng Supabase function để lấy thời gian server:
      // enrollment_date: supabase.fn.now(),
      progress: 0,
      status: 'studying',
    };

    // Chèn dữ liệu vào bảng user_courses
    const { error } = await supabase
      .from('user_courses')
      .insert([enrollmentData]);

    if (error) {
      console.error('Lỗi khi đăng ký khóa học:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
      setRegistered(false); // Đảm bảo trạng thái đăng ký không thành công
    } else {
      console.log('Đăng ký khóa học thành công!');
      // Cập nhật UI sau khi đăng ký thành công
      setRegistered(true);
    }

    // Ẩn QR code
    setShowQr(false);
  };

  return (
    <div>
      {!courseData ? 
        <div>
          <div>Not Found</div>
          {/* Back to courses */}
          <div className="mt-12">
            <Link to="/courses" className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Quay lại trang khóa học
            </Link>
          </div>
        </div>
        :
        <div className="space-y-8 bg-gray-50 py-2">
          {/* Course Header */}
          <div className="relative h-96 overflow-hidden rounded-xl max-w-6xl mx-auto">
            <img 
              src={courseData.image} 
              alt={courseData.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center mb-3">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium mr-3">{courseData.level}</span>
                <span className="text-sm font-medium">{courseData.duration} {courseData.duration_type}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
              <div className="flex items-center flex-wrap gap-6">
                <div className="flex items-center">
                  <img 
                    src={courseData.instructors?.avatar} 
                    alt={courseData.instructors?.name} 
                    className="h-10 w-10 rounded-full mr-2 border-2 border-white"
                  />
                  <span>{courseData.instructors?.name}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span>{courseData.rating} ({courseData.students_enrolled} đánh giá)</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  <span>{courseData.students_enrolled} học viên</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Tabs */}
                  <div className="border-b">
                    <ul className="flex flex-wrap -mb-px">
                      <li className="mr-2">
                        <button
                          onClick={() => setActiveTab('overview')}
                          className={`inline-block px-6 py-5 text-sm font-medium border-b-2 rounded-t-lg ${
                            activeTab === 'overview'
                              ? 'border-orange-500 text-orange-500'
                              : 'border-transparent hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          Tổng quan
                        </button>
                      </li>
                      <li className="mr-2">
                        <button
                          onClick={() => setActiveTab('syllabus')}
                          className={`inline-block px-6 py-5 text-sm font-medium border-b-2 rounded-t-lg ${
                            activeTab === 'syllabus'
                              ? 'border-orange-500 text-orange-500'
                              : 'border-transparent hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          Nội dung
                        </button>
                      </li>
                      <li className="mr-2">
                        <button
                          onClick={() => setActiveTab('instructor')}
                          className={`inline-block px-6 py-5 text-sm font-medium border-b-2 rounded-t-lg ${
                            activeTab === 'instructor'
                              ? 'border-orange-500 text-orange-500'
                              : 'border-transparent hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          Giảng viên
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Tab Content */}
                  <div className="p-8">
                    {activeTab === 'overview' && (
                      <div>
                        <h2 className="text-2xl font-semibold mb-6">Giới thiệu khóa học</h2>
                        <p className="text-gray-700 mb-8 leading-relaxed">{courseData.description}</p>
                        
                        <h3 className="text-xl font-semibold mb-4">Bạn sẽ học được gì</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {courseData.course_objectives?.map((objective) => (
                            <div key={objective.id} className="flex items-start">
                              <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="text-gray-700">{objective.objective}</span>
                            </div>
                          ))}
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-4">Yêu cầu</h3>
                        <ul className="space-y-3 mb-8">
                          {courseData.course_requirements?.map((requirement) => (
                            <li key={requirement.id} className="flex items-start">
                              <svg className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-gray-700">{requirement.requirement}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h3 className="text-xl font-semibold mb-4">Thông tin thêm</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                            <svg className="h-10 w-10 text-orange-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <div>
                              <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                              <p className="font-medium text-gray-800">{courseData.start_date}</p>
                            </div>
                          </div>
                          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                            <svg className="h-10 w-10 text-orange-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                            </svg>
                            <div>
                              <p className="text-sm text-gray-500">Ngôn ngữ</p>
                              <p className="font-medium text-gray-800">{courseData.language}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'syllabus' && (
                      <div>
                        <h2 className="text-2xl font-semibold mb-6">Nội dung khóa học</h2>
                        <div className="space-y-6">
                          {courseData.syllabus?.map((week) => (
                            <div key={week.week} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                              <div className="bg-orange-50 p-5 flex justify-between items-center border-b">
                                <h3 className="font-semibold text-lg">Tuần {week.week}: {week.title}</h3>
                              </div>
                              <div className="p-5">
                                <ul className="space-y-3">
                                  {week.syllabus_topics.map((topic) => (
                                    <li key={topic.id}>
                                      <div 
                                        className="flex items-start cursor-pointer hover:bg-gray-100 p-2 rounded-lg hover:text-blue-600 transition-colors duration-200"
                                        onClick={() => toggleTopic(topic.id)}
                                      >
                                        <svg className={`h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0 transition-transform ${expandedTopics[topic.id] ? 'rotate-90' : ''}`} 
                                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                        <span className="text-gray-700">{topic.topic}</span>
                                      </div>
                                      
                                      {/* Lessons list - only shown when topic is expanded */}
                                      {expandedTopics[topic.id] && (
                                        <div className="ml-8 mt-2 space-y-2">
                                          {topic.lessons && topic.lessons.length > 0 ? (
                                            topic.lessons.map((lesson) => (
                                              <div key={lesson.id} className="border-l-2 border-orange-200 pl-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectTopic(lesson.id)}>
                                                <div className="flex items-center">
                                                  <svg className="h-4 w-4 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                  </svg>
                                                  <div>
                                                    <span className="text-gray-800">{lesson.lesson_title}</span>
                                                    <span className="text-xs text-gray-500 ml-2">{lesson.duration} phút</span>
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          ) : (
                                            <div className="text-gray-500 italic pl-4 py-2">Không có bài học</div>
                                          )}
                                        </div>
                                      )}
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
                        <h2 className="text-2xl font-semibold mb-6">Về giảng viên</h2>
                        <div className="flex flex-col md:flex-row items-start mb-8 bg-orange-50 p-6 rounded-xl">
                          <img
                            src={courseData.instructors.avatar}
                            alt={courseData.instructors.name}
                            className="h-24 w-24 rounded-full mb-4 md:mb-0 md:mr-6 border-4 border-white shadow-sm"
                          />
                          <div>
                            <h3 className="text-xl font-semibold">{courseData.instructors.name}</h3>
                            <p className="text-orange-600 mb-3">{courseData.instructors.title}</p>
                            <div className="flex items-center mb-4">
                              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <span className="ml-1 text-sm">4.9 (120 đánh giá)</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{courseData.instructors.bio}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Similar Courses */}
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold mb-6">Khóa học tương tự</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {similarCourses.map(course => (
                      <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex hover:shadow-md transition-shadow duration-300">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-32 h-full object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="font-medium text-lg mb-1 line-clamp-1">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-2 flex items-center">
                              <img 
                                src={course.instructor.avatar} 
                                alt={course.instructor.name}
                                className="h-5 w-5 rounded-full mr-2" 
                              />
                              {course.instructor.name}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-700">{course.duration}</span>
                            <span className="font-medium text-orange-500">{course.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                  <div className="text-center mb-6 pb-6 border-b">
                    <p className="text-4xl font-bold text-orange-500 mb-1">{courseData.price}</p>
                    <p className="text-gray-500">Học phí trọn khóa</p>
                  </div>

                  {/* Nút đăng ký thay đổi thành nút có sự kiện */}
                  <button
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-medium mb-4 hover:bg-orange-600 transition-colors shadow-sm"
                    onClick={handleRegisterClick}
                    disabled={showQr} // Disable nút khi đang hiển thị QR để tránh nhấn nhiều lần
                  >
                    Đăng ký ngay
                  </button>

                  {/* Hiển thị QR code khi showQr = true */}
                  {showQr && (
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                      <h3 className="text-lg font-semibold mb-4">Quét QR code để đăng ký khóa học</h3>
                      <div className="flex justify-center mb-6">
                        <img src="/images/qr.png" alt="QR Code Đăng ký" className="w-48 h-48" />
                      </div>
                      <button
                        className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-colors"
                        onClick={handleScanComplete}
                      >
                        Đã quét xong
                      </button>
                    </div>
                  )}

                  {/* Hiển thị thông báo khi đăng ký thành công */}
                  {registered && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-xl mt-4 text-center font-semibold">
                      Đăng ký khóa học thành công!
                    </div>
                  )}

                  <button className="w-full bg-white border-2 border-orange-500 text-orange-500 py-4 rounded-xl font-medium mb-8 hover:bg-orange-50 transition-colors">
                    Thêm vào danh sách quan tâm
                  </button>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Cấp độ</span>
                      <span className="font-medium text-gray-800">{courseData.level}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Thời lượng</span>
                      <span className="font-medium text-gray-800">{courseData.duration} {courseData.duration_type}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Ngôn ngữ</span>
                      <span className="font-medium text-gray-800">{courseData.language}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Số học viên</span>
                      <span className="font-medium text-gray-800">{courseData.students_enrolled}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Ngày bắt đầu</span>
                      <span className="font-medium text-gray-800">{courseData.start_date}</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 text-center">Khóa học bao gồm</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>24 bài học video</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>16 bài tập thực hành</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Chứng chỉ hoàn thành</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Truy cập vĩnh viễn</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Hỗ trợ trực tuyến</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                    <div className="flex items-center mb-4">
                      <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="font-semibold text-lg">Cần tư vấn thêm?</h3>
                    </div>
                    <p className="text-gray-700 mb-4">Liên hệ với chúng tôi để được tư vấn chi tiết về khóa học và lộ trình học tập phù hợp với bạn.</p>
                    <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      Liên hệ tư vấn
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to courses */}
            <div className="mt-12">
              <Link to="/courses" className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Quay lại trang khóa học
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default CourseDetail;
