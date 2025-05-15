import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Cấu hình API Lingva
const LINGVA_API_URL = 'https://lingva.ml/api/v1';

// Danh sách ngôn ngữ mặc định
const DEFAULT_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' }
];

// Từ điển học thuật cơ bản làm base
const BASE_DICTIONARY_DATA = {
  'academic': {
    type: 'adj',
    meaning: 'Liên quan đến giáo dục, học tập và nghiên cứu, đặc biệt là ở cấp đại học',
    examples: ['Academic research', 'Academic writing']
  },
  'hypothesis': {
    type: 'n',
    meaning: 'Giả thuyết, một ý tưởng hoặc lý thuyết được đưa ra làm cơ sở cho lập luận hoặc hành động',
    examples: ['Research hypothesis', 'Test a hypothesis']
  },
  'methodology': {
    type: 'n',
    meaning: 'Phương pháp luận, tập hợp các phương pháp và nguyên tắc được sử dụng trong một nghiên cứu',
    examples: ['Research methodology', 'Scientific methodology']
  },
  'analysis': {
    type: 'n',
    meaning: 'Phân tích, quá trình nghiên cứu chi tiết để hiểu rõ bản chất của vấn đề',
    examples: ['Data analysis', 'Statistical analysis']
  },
  'empirical': {
    type: 'adj',
    meaning: 'Thực nghiệm, dựa trên quan sát hoặc kinh nghiệm thực tế',
    examples: ['Empirical evidence', 'Empirical research']
  },
  'theoretical': {
    type: 'adj',
    meaning: 'Lý thuyết, dựa trên lý thuyết hoặc các nguyên lý trừu tượng',
    examples: ['Theoretical framework', 'Theoretical physics']
  },
  'research': {
    type: 'n/v',
    meaning: 'Nghiên cứu, quá trình tìm hiểu có hệ thống để khám phá hoặc xác minh thông tin',
    examples: ['Research paper', 'Research findings']
  },
  'literature': {
    type: 'n',
    meaning: 'Tài liệu, văn献 học thuật đã được công bố về một chủ đề cụ thể',
    examples: ['Literature review', 'Scientific literature']
  }
};

const TranslatePage = () => {
  const location = useLocation();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('vi');
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState(DEFAULT_LANGUAGES);
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [dictionaryData, setDictionaryData] = useState(BASE_DICTIONARY_DATA);

  // Reset search states when component mounts
  useEffect(() => {
    setSearchTerm('');
    setSearchResults([]);
    setError('');
  }, []);

  // Thêm useEffect để xử lý query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSourceText(query);
      handleTextChange(query);
    }
  }, [location.search]);

  // Fetch available languages when component mounts
  useEffect(() => {
    fetchLanguages();
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
    if (text.length > 50) { // Chỉ tự động phát hiện khi văn bản đủ dài
      await detectLanguage(text);
    }
  };

  // Hàm tìm kiếm từ điển kết hợp với dịch
  const handleDictionarySearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    const term = searchTerm.toLowerCase();
    
    try {
      // Tìm trong từ điển cơ bản
      const baseResults = Object.entries(dictionaryData)
        .filter(([word, data]) => {
          // Tìm từ chính xác hoặc từ liên quan
          return word.toLowerCase().includes(term) || 
                 term.includes(word.toLowerCase()) ||
                 data.meaning.toLowerCase().includes(term) ||
                 data.examples.some(ex => ex.toLowerCase().includes(term));
        })
        .map(([word, data]) => ({
          word,
          ...data,
          source: 'base',
          relevance: word.toLowerCase() === term ? 3 : // Từ chính xác
                    word.toLowerCase().includes(term) ? 2 : // Từ chứa term
                    1 // Từ liên quan
        }));

      // Dịch từ sang tiếng Việt nếu chưa đủ 3 kết quả
      if (baseResults.length < 3) {
        const translationResponse = await fetch(
          `${LINGVA_API_URL}/en/vi/${encodeURIComponent(searchTerm)}`
        );

        if (translationResponse.ok) {
          const translationData = await translationResponse.json();
          if (translationData.translation) {
            // Thêm kết quả dịch vào từ điển
            const newWord = {
              word: searchTerm,
              type: 'auto',
              meaning: translationData.translation,
              examples: [],
              source: 'translation',
              relevance: 4 // Ưu tiên cao nhất vì là từ được tìm kiếm
            };

            // Cập nhật từ điển
            setDictionaryData(prev => ({
              ...prev,
              [searchTerm]: newWord
            }));

            // Thêm vào kết quả tìm kiếm nếu chưa có
            if (!baseResults.some(result => result.word === searchTerm)) {
              baseResults.push(newWord);
            }

            // Tìm thêm các từ liên quan từ nghĩa của từ vừa dịch
            const relatedWords = Object.entries(dictionaryData)
              .filter(([word, data]) => {
                return data.meaning.toLowerCase().includes(translationData.translation.toLowerCase()) &&
                       !baseResults.some(result => result.word === word);
              })
              .map(([word, data]) => ({
                word,
                ...data,
                source: 'base',
                relevance: 1
              }));

            baseResults.push(...relatedWords);
          }
        }
      }

      // Sắp xếp kết quả theo độ liên quan và nguồn
      const sortedResults = baseResults.sort((a, b) => {
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance; // Sắp xếp theo độ liên quan
        }
        if (a.source !== b.source) {
          return a.source === 'base' ? -1 : 1; // Ưu tiên từ điển cơ bản
        }
        return a.word.localeCompare(b.word); // Sắp xếp theo alphabet
      });

      // Lấy ít nhất 3 kết quả và tối đa 5 kết quả
      const minResults = Math.min(3, sortedResults.length);
      const maxResults = Math.min(5, sortedResults.length);
      const finalResults = sortedResults.slice(0, 
        sortedResults.length >= 3 ? maxResults : minResults
      );

      setSearchResults(finalResults);

      // Hiển thị thông báo nếu không đủ 3 kết quả
      if (finalResults.length < 3) {
        setError('Không tìm thấy đủ từ liên quan. Vui lòng thử từ khóa khác.');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.');
    } finally {
      setIsSearching(false);
    }
  };

  // Xử lý khi người dùng nhập
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setSearchResults([]);
    }
  };

  // Xử lý khi nhấn Enter
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleDictionarySearch();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Dịch văn bản</h1>
        
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
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Từ điển học thuật</h2>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
            placeholder="Nhập từ khóa cần tra cứu..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
          />
          <button 
            onClick={handleDictionarySearch}
            disabled={!searchTerm.trim() || isSearching}
            className={`rounded-lg px-4 py-2 text-white ${
              !searchTerm.trim() || isSearching ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isSearching ? 'Đang tìm...' : 'Tra cứu'}
          </button>
        </div>
        
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-medium">
            {searchResults.length > 0 ? 'Kết quả tra cứu' : 'Từ vựng học thuật phổ biến'}
          </h3>
          <div className="space-y-4">
            {(searchResults.length > 0 ? searchResults : Object.entries(dictionaryData).slice(0, 5)).map((item) => {
              const word = item.word || item[0];
              const data = item.type ? item : dictionaryData[item[0]];
              
              return (
                <div key={word} className="rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">
                      {word} 
                      <span className="text-sm text-gray-500 ml-2">({data.type})</span>
                    </h4>
                    {data.source === 'translation' && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        Dịch tự động
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{data.meaning}</p>
                  {data.examples && data.examples.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-medium">Ví dụ:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                        {data.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            {searchTerm && searchResults.length === 0 && (
              <p className="text-gray-500 italic">Không tìm thấy kết quả phù hợp.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;
