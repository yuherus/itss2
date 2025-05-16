import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DictionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dictionary, setDictionary] = useState([]);
  const [suggestedWords, setSuggestedWords] = useState([]);

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Hàm tìm kiếm
  const performSearch = useCallback(
    (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        // Tìm kiếm từ trong từ điển
        const results = dictionary.filter(
          (item) =>
            item.word.toLowerCase().includes(query.toLowerCase()) ||
            item.meaning.toLowerCase().includes(query.toLowerCase()),
        );

        setSearchResults(results);
      } catch (err) {
        setError('Có lỗi xảy ra khi tìm kiếm');
      } finally {
        setLoading(false);
      }
    },
    [dictionary],
  );

  // Hàm tạo gợi ý khi nhập
  const generateSuggestions = useCallback(
    (query) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      const results = dictionary
        .filter(
          (item) =>
            item.word.toLowerCase().includes(query.toLowerCase()) ||
            item.meaning.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5); // Giới hạn 5 gợi ý

      setSuggestions(results);
    },
    [dictionary],
  );

  // Random từ vựng gợi ý
  const getRandomSuggestedWords = useCallback(() => {
    if (dictionary.length <= 6) return dictionary;

    const shuffled = [...dictionary].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [dictionary]);

  // Xử lý text-to-speech
  const speakWord = useCallback((word, pronunciation) => {
    if ('speechSynthesis' in window) {
      // Dừng speech trước đó nếu có
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US'; // Đặt ngôn ngữ tiếng Anh
      utterance.rate = 0.9; // Tốc độ nói

      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech không được hỗ trợ trên trình duyệt này');
    }
  }, []);

  // Lấy query parameter từ URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    } else {
      setSearchResults([]);
      setSearchQuery('');
    }
  }, [location.search, performSearch]);

  // Lấy dữ liệu từ dataset.json
  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await fetch('/dataset.json');
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu từ điển');
        }
        const data = await response.json();
        setDictionary(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDictionary();
  }, []);

  // Set random suggested words khi dictionary thay đổi
  useEffect(() => {
    if (dictionary.length > 0) {
      setSuggestedWords(getRandomSuggestedWords());
    }
  }, [dictionary, getRandomSuggestedWords]);

  // Xử lý click outside để ẩn suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Xử lý khi người dùng thay đổi input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    generateSuggestions(value);
    setShowSuggestions(true);

    // Nếu xóa hết giá trị input, xóa kết quả tìm kiếm
    if (!value.trim()) {
      setSearchResults([]);
      if (location.search) {
        navigate('/dictionary');
      }
    }
  };

  // Xử lý khi người dùng chọn từ gợi ý
  const handleSelectSuggestion = (word) => {
    setSearchQuery(word);
    setShowSuggestions(false);
    navigate(`/dictionary?q=${encodeURIComponent(word)}`);
    performSearch(word);
  };

  // Xử lý khi submit form tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dictionary?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  // Làm mới từ vựng gợi ý
  const refreshSuggestedWords = () => {
    setSuggestedWords(getRandomSuggestedWords());
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Tra cứu từ điển</h1>

        {/* Form tìm kiếm */}
        <form onSubmit={handleSearch} className="mb-8 relative">
          <div className="flex">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Nhập từ cần tra cứu..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                className="w-full rounded-l-lg border border-gray-300 pl-10 pr-4 py-3 focus:border-orange-500 focus:outline-none"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="rounded-r-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Gợi ý tìm kiếm */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg border border-gray-200"
            >
              <ul className="py-1">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(item.word)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                  >
                    <div>
                      <span className="font-medium">{item.word}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({item.type})
                      </span>
                    </div>
                    <span className="text-orange-500">{item.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* Hiển thị lỗi */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600 mb-6">
            {error}
          </div>
        )}

        {/* Đang tải */}
        {loading && (
          <div className="flex justify-center py-8">
            <svg
              className="animate-spin h-8 w-8 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {/* Kết quả tìm kiếm */}
        {!loading && searchResults.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Kết quả tìm kiếm</h2>
            {searchResults.map((item, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.word}
                      </h3>
                      <button
                        onClick={() => speakWord(item.word, item.pronunciation)}
                        className="ml-2 p-1 text-gray-500 hover:text-orange-500 focus:outline-none"
                        title="Nghe phát âm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                        </svg>
                      </button>
                      <span className="ml-2 text-sm text-gray-500">
                        /{item.pronunciation}/
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      ({item.type}) {item.field && `- Lĩnh vực: ${item.field}`}
                    </p>
                  </div>

                  <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                    {item.meaning}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 mb-2">{item.definition}</p>
                  {item.example && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300 italic text-gray-600">
                      {item.example}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Không tìm thấy kết quả cho "{searchQuery}"
              </p>
            </div>
          )
        )}

        {/* Hiển thị từ gợi ý khi chưa tìm kiếm */}
        {!searchQuery && !loading && suggestedWords.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Từ vựng gợi ý</h2>
              <button
                onClick={refreshSuggestedWords}
                className="text-orange-500 hover:text-orange-600 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Làm mới
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedWords.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4 shadow-sm hover:bg-gray-100"
                  onClick={() => handleSelectSuggestion(item.word)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="font-bold text-gray-800">{item.word}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(item.word, item.pronunciation);
                        }}
                        className="ml-2 p-1 text-gray-500 hover:text-orange-500 focus:outline-none"
                        title="Nghe phát âm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">({item.type})</span>
                  </div>
                  <p className="text-orange-600 font-medium">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryPage;
