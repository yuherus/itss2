import React, { useRef } from 'react';

const SearchBar = ({
  searchQuery,
  showSuggestions,
  suggestions,
  setSearchQuery,
  setShowSuggestions,
  generateSuggestions,
  handleSelectSuggestion,
  handleSearch,
  suggestionsRef,
}) => {
  const searchInputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    generateSuggestions(value);
    setShowSuggestions(true);
  };

  return (
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
  );
};

export default SearchBar;
