import React, { useState } from 'react';

const MaterialCard = ({ material }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            material.type === 'PDF' ? 'bg-red-100 text-red-600' :
            material.type === 'DOC' ? 'bg-blue-100 text-blue-600' :
            material.type === 'VIDEO' ? 'bg-green-100 text-green-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            {material.type}
          </span>
          <span className="text-sm text-gray-500">{material.size}</span>
        </div>
        
        <h3 className="mb-2 text-lg font-semibold">{material.title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{material.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {material.date}
          </div>
          
          <button className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-500 hover:bg-orange-200">
            Tải xuống
          </button>
        </div>
      </div>
    </div>
  );
};

const MaterialsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dữ liệu tài liệu mẫu
  const materialsData = [
    {
      id: 1,
      title: "Academic Writing Structure Guide",
      description: "A comprehensive guide to structuring academic essays, research papers, and dissertations.",
      type: "PDF",
      category: "writing",
      size: "2.4 MB",
      date: "Updated 15/03/2025"
    },
    {
      id: 2,
      title: "Academic Vocabulary List",
      description: "Essential vocabulary for academic writing and speaking, with examples in context.",
      type: "DOC",
      category: "vocabulary",
      size: "1.8 MB",
      date: "Updated 20/02/2025"
    },
    {
      id: 3,
      title: "Lecture Comprehension Strategies",
      description: "Techniques for effective note-taking and comprehension during academic lectures.",
      type: "PDF",
      category: "listening",
      size: "3.1 MB",
      date: "Updated 05/01/2025"
    },
    {
      id: 4,
      title: "Academic Presentation Templates",
      description: "Professional templates for academic presentations with guidance on structure and delivery.",
      type: "PPT",
      category: "speaking",
      size: "5.6 MB",
      date: "Updated 10/12/2024"
    },
    {
      id: 5,
      title: "Research Methodology Overview",
      description: "Introduction to common research methodologies used in academic studies.",
      type: "PDF",
      category: "research",
      size: "4.2 MB",
      date: "Updated 25/11/2024"
    },
    {
      id: 6,
      title: "Academic Reading Techniques",
      description: "Strategies for efficient reading of academic texts, including skimming, scanning, and critical analysis.",
      type: "PDF",
      category: "reading",
      size: "2.7 MB",
      date: "Updated 18/10/2024"
    },
    {
      id: 7,
      title: "Academic Discussion Video Series",
      description: "Video tutorials on participating effectively in academic discussions and seminars.",
      type: "VIDEO",
      category: "speaking",
      size: "250 MB",
      date: "Updated 30/09/2024"
    },
    {
      id: 8,
      title: "Citation and Referencing Guide",
      description: "Comprehensive guide to APA, MLA, Chicago, and Harvard referencing styles.",
      type: "PDF",
      category: "writing",
      size: "3.5 MB",
      date: "Updated 15/08/2024"
    }
  ];
  
  // Lọc tài liệu dựa trên category và search query
  const filteredMaterials = materialsData.filter(material => {
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
    const matchesQuery = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Tài liệu học thuật</h1>
        
        {/* Thanh tìm kiếm */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-orange-500 focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Category filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveCategory('writing')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'writing'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Writing
          </button>
          <button
            onClick={() => setActiveCategory('vocabulary')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'vocabulary'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vocabulary
          </button>
          <button
            onClick={() => setActiveCategory('reading')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'reading'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reading
          </button>
          <button
            onClick={() => setActiveCategory('speaking')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'speaking'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Speaking
          </button>
          <button
            onClick={() => setActiveCategory('listening')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'listening'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Listening
          </button>
          <button
            onClick={() => setActiveCategory('research')}
            className={`rounded-full px-4 py-1 text-sm ${
              activeCategory === 'research'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Research
          </button>
        </div>
        
        {/* Materials list */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Không tìm thấy tài liệu phù hợp.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Upload section */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Đóng góp tài liệu</h2>
        <p className="mb-6 text-gray-600">
          Bạn có tài liệu học thuật hữu ích và muốn chia sẻ với cộng đồng? Hãy tải lên và giúp đỡ những người học khác.
        </p>
        
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
          <p className="mb-4 text-gray-500">Kéo và thả hoặc nhấp để chọn tệp</p>
          <button className="rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
            Tải lên tài liệu
          </button>
        </div>
        <p className="mt-4 text-xs text-gray-500">Hỗ trợ định dạng: PDF, DOC, PPT, VIDEO</p>
      </div>
    </div>
  );
}
export default MaterialsPage;
