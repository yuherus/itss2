import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Cấu hình API Lingva
const LINGVA_API_URL = 'https://lingva.ml/api/v1';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const text = e.target.value;
    setSearchTerm(text);
    
    if (text.trim().length > 0) {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${LINGVA_API_URL}/en/vi/${encodeURIComponent(text)}`);
        
        if (!response.ok) {
          throw new Error('Translation failed');
        }
        
        const data = await response.json();
        if (data && data.translation) {
          setTranslation(data.translation);
          setShowTranslation(true);
        }
      } catch (error) {
        console.error('Translation error:', error);
        setError('Không thể dịch từ này');
        setShowTranslation(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowTranslation(false);
      setTranslation('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/translate?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            G-Easy English
          </Link>
          
          <div className="relative flex-1 max-w-xl mx-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              placeholder="Nhập từ cần dịch nhanh..."
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
            />
            {showTranslation && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg p-3 z-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{searchTerm}</p>
                    <p className="text-gray-600">{translation}</p>
                  </div>
                  <Link 
                    to={`/translate?q=${encodeURIComponent(searchTerm)}`}
                    className="text-orange-500 hover:text-orange-600 text-sm"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg p-3">
                <p className="text-gray-600">Đang dịch...</p>
              </div>
            )}
            {error && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg p-3">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </div>

          <nav className="flex items-center space-x-4">
            <Link to="/courses" className="text-gray-600 hover:text-orange-500">
              Khóa học
            </Link>
            <Link to="/materials" className="text-gray-600 hover:text-orange-500">
              Tài liệu
            </Link>
            <Link to="/translate" className="text-gray-600 hover:text-orange-500">
              Dịch
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-orange-500">
              Liên hệ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 