import React from 'react';
import WordDetail from './WordDetail';

const SearchResults = ({ searchResults, loading, searchQuery, speakWord }) => {
  if (loading) {
    return null;
  }

  if (searchResults.length === 0 && searchQuery) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Không tìm thấy kết quả cho "{searchQuery}"
        </p>
      </div>
    );
  }

  if (searchResults.length > 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Kết quả tìm kiếm</h2>
        {searchResults.map((item, index) => (
          <WordDetail key={index} item={item} speakWord={speakWord} />
        ))}
      </div>
    );
  }

  return null;
};

export default SearchResults;
