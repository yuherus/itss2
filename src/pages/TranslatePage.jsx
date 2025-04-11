import React, { useState } from 'react';

const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('vi');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsLoading(true);
    
    // Giả lập API call để dịch văn bản
    try {
      // Trong dự án thực tế, bạn sẽ gọi API thực sự ở đây
      setTimeout(() => {
        setTranslatedText(`Đây là bản dịch học thuật của: "${sourceText}"`);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi dịch:', error);
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    
    // Xóa các văn bản khi đổi ngôn ngữ
    setSourceText('');
    setTranslatedText('');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Dịch tiếng Anh học thuật</h1>
        
        <div className="mb-4 flex items-center justify-between">
          <div className="w-2/5">
            <select 
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
            >
              <option value="en">Tiếng Anh</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
          
          <button 
            onClick={handleSwapLanguages}
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
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
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Nhập văn bản cần dịch..."
              className="h-64 w-full rounded-lg border border-gray-300 p-4 focus:border-orange-500 focus:outline-none"
            ></textarea>
          </div>
          
          <div>
            <textarea
              value={translatedText}
              readOnly
              placeholder="Bản dịch sẽ hiển thị ở đây..."
              className="h-64 w-full rounded-lg border border-gray-300 p-4 bg-gray-50"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className={`rounded-full px-6 py-2 font-medium text-white ${
              isLoading || !sourceText.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
            }`}
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
            placeholder="Nhập từ khóa cần tra cứu..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
          />
          <button className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
            Tra cứu
          </button>
        </div>
        
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-medium">Kết quả phổ biến</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="font-medium">academic (adj)</h4>
              <p className="text-sm text-gray-600">Liên quan đến giáo dục, học tập và nghiên cứu, đặc biệt là ở cấp đại học</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="font-medium">hypothesis (n)</h4>
              <p className="text-sm text-gray-600">Giả thuyết, một ý tưởng hoặc lý thuyết được đưa ra làm cơ sở cho lập luận hoặc hành động</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;
