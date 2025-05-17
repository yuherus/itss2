import React from 'react';

const TextTranslationPanel = ({
  sourceText,
  translatedText,
  isLoading,
  isDetecting,
  error,
  handleTextChange,
}) => {
  return (
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
        {isLoading && (
          <p className="mt-2 text-gray-500 text-sm">Đang dịch...</p>
        )}
      </div>
    </div>
  );
};

export default TextTranslationPanel;
