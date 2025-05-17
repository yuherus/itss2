import React from 'react';

const LanguageSelector = ({
  sourceLang,
  targetLang,
  languages,
  detectedLanguage,
  setSourceLang,
  setTargetLang,
  handleSwapLanguages,
}) => {
  return (
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
            Đã phát hiện:{' '}
            {languages.find((l) => l.code === detectedLanguage.lang)?.name}
            {detectedLanguage.confidence &&
              ` (${Math.round(detectedLanguage.confidence * 100)}% độ tin cậy)`}
          </p>
        )}
      </div>

      <button
        onClick={handleSwapLanguages}
        className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        title="Hoán đổi ngôn ngữ"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
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
  );
};

export default LanguageSelector;
