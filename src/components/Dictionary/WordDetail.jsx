import React from 'react';

const WordDetail = ({ item, speakWord }) => {
  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="text-xl font-bold text-gray-800">{item.word}</h3>
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
              {item.pronunciation}
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
  );
};

export default WordDetail;
