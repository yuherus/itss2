import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SearchBar from '../components/Dictionary/SearchBar';
import SearchResults from '../components/Dictionary/SearchResults';
import SuggestedWords from '../components/Dictionary/SuggestedWords';
import LoadingIndicator from '../components/Dictionary/LoadingIndicator';

const DictionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dictionary, setDictionary] = useState([]);
  const [suggestedWords, setSuggestedWords] = useState([]);

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
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <SearchBar
          searchQuery={searchQuery}
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          setSearchQuery={setSearchQuery}
          setShowSuggestions={setShowSuggestions}
          generateSuggestions={generateSuggestions}
          handleSelectSuggestion={handleSelectSuggestion}
          handleSearch={handleSearch}
          suggestionsRef={suggestionsRef}
        />

        {/* Hiển thị lỗi */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600 mb-6">
            {error}
          </div>
        )}

        {/* Đang tải */}
        {loading && <LoadingIndicator />}

        {/* Kết quả tìm kiếm */}
        <SearchResults
          searchResults={searchResults}
          loading={loading}
          searchQuery={searchQuery}
          speakWord={speakWord}
        />

        {/* Hiển thị từ gợi ý khi chưa tìm kiếm */}
        {!searchQuery && !loading && suggestedWords.length > 0 && (
          <SuggestedWords
            suggestedWords={suggestedWords}
            handleSelectSuggestion={handleSelectSuggestion}
            speakWord={speakWord}
            refreshSuggestedWords={refreshSuggestedWords}
          />
        )}
      </div>
    </div>
  );
};

export default DictionaryPage;
