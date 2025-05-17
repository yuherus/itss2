import React from 'react';

const SuggestedWords = ({
  suggestedWords,
  handleSelectSuggestion,
  speakWord,
  refreshSuggestedWords,
}) => {
  if (!suggestedWords || suggestedWords.length === 0) {
    return null;
  }

  return (
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
            className="rounded-lg bg-gray-50 p-4 shadow-sm hover:bg-gray-100 cursor-pointer"
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
  );
};

export default SuggestedWords;
