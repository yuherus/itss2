import React from 'react';

const TranslationModeToggle = ({ activeMode, setActiveMode }) => {
  return (
    <div className="mb-6 flex rounded-lg border border-gray-300 overflow-hidden">
      <button
        onClick={() => setActiveMode('text')}
        className={`flex-1 py-2 text-center font-medium ${
          activeMode === 'text'
            ? 'bg-orange-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="flex items-center justify-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Dịch văn bản
        </span>
      </button>
      <button
        onClick={() => setActiveMode('image')}
        className={`flex-1 py-2 text-center font-medium ${
          activeMode === 'image'
            ? 'bg-orange-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="flex items-center justify-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Dịch ảnh
        </span>
      </button>
    </div>
  );
};

export default TranslationModeToggle;
