import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Cấu hình API Lingva
const LINGVA_API_URL = 'https://lingva.ml/api/v1';

// Cấu hình Supabase Storage URL
const SUPABASE_STORAGE_URL = 'https://your-project.supabase.co/storage/v1/object/public';

// Danh sách ngôn ngữ mặc định
const DEFAULT_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' }
];

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

const CourseCard = ({ course }) => {
  // Tạo URL đầy đủ cho ảnh từ Supabase
  const imageUrl = course.image;
  
  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden">
      <img 
        src={imageUrl}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-orange-500">{course.level}</span>
          <span className="text-sm text-gray-500">{course.duration_type}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-500">${course.price}</span>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('vi');
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState(DEFAULT_LANGUAGES);
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    fetchLanguages();
    fetchFeaturedCourses();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${LINGVA_API_URL}/languages`);
      if (!response.ok) throw new Error('Failed to fetch languages');
      const data = await response.json();
      setLanguages(data.languages || DEFAULT_LANGUAGES);
    } catch (error) {
      console.error('Error fetching languages:', error);
      setError('Không thể tải danh sách ngôn ngữ. Đang sử dụng danh sách mặc định.');
    }
  };

  const fetchFeaturedCourses = async () => {
    try {
      setIsLoadingCourses(true);
      const { data: courses, error } = await supabase
        .from('courses')
        .select('*')
        .order('rating', { ascending: false })
        .limit(5);

      if (error) throw error;

      setFeaturedCourses(courses || []);
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      setError('Không thể tải danh sách khóa học. Vui lòng thử lại sau.');
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const detectLanguage = async (text) => {
    if (!text.trim()) return;
    setIsDetecting(true);

    try {
      const response = await fetch(`${LINGVA_API_URL}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text
        })
      });

      if (!response.ok) throw new Error('Language detection failed');
      
      const data = await response.json();
      if (data && data.lang) {
        setDetectedLanguage(data);
        setSourceLang(data.lang);
        return data.lang;
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      setError('Không thể phát hiện ngôn ngữ');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${LINGVA_API_URL}/${sourceLang}/${targetLang}/${encodeURIComponent(sourceText)}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Translation failed');
      }

      const data = await response.json();
      
      if (data && data.translation) {
        setTranslatedText(data.translation);
      } else {
        throw new Error('Không nhận được kết quả dịch');
      }
    } catch (error) {
      console.error('Lỗi khi dịch:', error);
      setError('Có lỗi xảy ra khi dịch. Vui lòng thử lại sau.');
      setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    
    setSourceText(translatedText);
    setTranslatedText('');
    setError('');
    setDetectedLanguage(null);
  };

  const handleTextChange = async (text) => {
    setSourceText(text);
    if (text.length > 50) {
      await detectLanguage(text);
    }
  };

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
              src="/images/hero.jpg" 
              alt="Student studying" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Translation Section */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Dịch văn bản</h2>
        
        <div className="mb-4 flex items-center justify-between">
          <div className="w-2/5">
            <select 
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            {detectedLanguage && (
              <p className="mt-1 text-sm text-gray-600">
                Đã phát hiện: {languages.find(l => l.code === detectedLanguage.lang)?.name}
                {detectedLanguage.confidence && ` (${Math.round(detectedLanguage.confidence * 100)}% độ tin cậy)`}
              </p>
            )}
          </div>
          
          <button 
            onClick={handleSwapLanguages}
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            title="Hoán đổi ngôn ngữ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          
          <div className="w-2/5">
            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <textarea
              value={sourceText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Nhập văn bản cần dịch..."
              className="h-64 w-full rounded-lg border border-gray-300 p-4 focus:border-orange-500 focus:outline-none"
            ></textarea>
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>{sourceText.length} ký tự</span>
              {isDetecting && <span>Đang phát hiện ngôn ngữ...</span>}
            </div>
          </div>
          
          <div>
            <textarea
              value={translatedText}
              readOnly
              placeholder="Bản dịch sẽ hiển thị ở đây..."
              className="h-64 w-full rounded-lg border border-gray-300 p-4 bg-gray-50"
            ></textarea>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className={`rounded-full px-6 py-2 font-medium text-white ${isLoading || !sourceText.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {isLoading ? 'Đang dịch...' : 'Dịch ngay'}
          </button>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Khóa học nổi bật</h2>
          <p className="text-gray-600">
            Khám phá các khóa học tiếng Anh học thuật chất lượng cao được thiết kế bởi các chuyên gia hàng đầu.
          </p>
        </div>

        {isLoadingCourses ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link 
                to="/courses" 
                className="inline-block rounded-full border border-orange-500 px-6 py-2 font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white"
              >
                Xem tất cả khóa học
              </Link>
            </div>
          </>
        )}
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
