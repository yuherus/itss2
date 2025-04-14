import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

// Component Modal để hiển thị preview
const PreviewModal = ({ isOpen, onClose, file }) => {
  if (!isOpen) return null;

  const corsProxyUrl = "https://proxy.corsfix.com/?";
  const documents = file.url ? [{ uri: corsProxyUrl + file.url, fileName: file.title }] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl max-h-screen overflow-hidden bg-white rounded-lg shadow-xl p-1">
        <div className="flex justify-between items-center p-2 border-b">
          <h3 className="text-lg font-semibold">{file.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="h-[70vh] overflow-auto">
          {file.url ? (
            <DocViewer
              documents={documents}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: true
                }
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Không có URL file để xem trước</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <span className="text-sm text-gray-500">{file.type} · {file.size}</span>
          <a 
            href={file.url} 
            download={file.title}
            className="rounded-full bg-orange-500 px-4 py-1 text-sm text-white hover:bg-orange-600"
          >
            Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
};

const MaterialCard = ({ material, onPreview }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            material.type === 'PDF' ? 'bg-red-100 text-red-600' :
            material.type === 'DOC' ? 'bg-blue-100 text-blue-600' :
            material.type === 'VIDEO' ? 'bg-green-100 text-green-600' :
            material.type === 'PPT' ? 'bg-yellow-100 text-yellow-600' :
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
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onPreview(material)}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-500 hover:bg-blue-200"
            >
              Xem trước
            </button>
            <button className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-500 hover:bg-orange-200">
              Tải xuống
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Dữ liệu tài liệu mẫu với thêm URLs
  const materialsData = [
    {
      id: 1,
      title: "Academic Writing Structure Guide",
      description: "A comprehensive guide to structuring academic essays, research papers, and dissertations.",
      type: "PDF",
      category: "writing",
      size: "2.4 MB",
      date: "Updated 15/03/2025",
      url: "https://pdf.bankexamstoday.com/raman_files/Error_Spotting_rules_blogger.pdf"
    },
    {
      id: 2,
      title: "Academic Vocabulary List",
      description: "Essential vocabulary for academic writing and speaking, with examples in context.",
      type: "DOC",
      category: "vocabulary",
      size: "1.8 MB",
      date: "Updated 20/02/2025",
      url: "https://example-storage.com/files/academic-vocabulary.docx"
    },
    {
      id: 3,
      title: "Lecture Comprehension Strategies",
      description: "Techniques for effective note-taking and comprehension during academic lectures.",
      type: "PDF",
      category: "listening",
      size: "3.1 MB",
      date: "Updated 05/01/2025",
      url: "https://example-storage.com/files/lecture-strategies.pdf"
    },
    {
      id: 4,
      title: "Academic Presentation Templates",
      description: "Professional templates for academic presentations with guidance on structure and delivery.",
      type: "PPT",
      category: "speaking",
      size: "5.6 MB",
      date: "Updated 10/12/2024",
      url: "https://example-storage.com/files/presentation-templates.pptx"
    },
    {
      id: 5,
      title: "Research Methodology Overview",
      description: "Introduction to common research methodologies used in academic studies.",
      type: "PDF",
      category: "research",
      size: "4.2 MB",
      date: "Updated 25/11/2024",
      url: "https://example-storage.com/files/research-methodology.pdf"
    },
    {
      id: 6,
      title: "Academic Reading Techniques",
      description: "Strategies for efficient reading of academic texts, including skimming, scanning, and critical analysis.",
      type: "PDF",
      category: "reading",
      size: "2.7 MB",
      date: "Updated 18/10/2024",
      url: "https://example-storage.com/files/reading-techniques.pdf"
    },
    {
      id: 7,
      title: "Academic Discussion Video Series",
      description: "Video tutorials on participating effectively in academic discussions and seminars.",
      type: "VIDEO",
      category: "speaking",
      size: "250 MB",
      date: "Updated 30/09/2024",
      url: "https://example-storage.com/files/discussion-videos.mp4"
    },
    {
      id: 8,
      title: "Citation and Referencing Guide",
      description: "Comprehensive guide to APA, MLA, Chicago, and Harvard referencing styles.",
      type: "PDF",
      category: "writing",
      size: "3.5 MB",
      date: "Updated 15/08/2024",
      url: "https://example-storage.com/files/citation-guide.pdf"
    }
  ];
  
  // Lọc tài liệu dựa trên category và search query
  const filteredMaterials = materialsData.filter(material => {
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
    const matchesQuery = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Xử lý mở preview
  const handlePreview = (material) => {
    setPreviewFile(material);
    setIsPreviewOpen(true);
  };

  // Xử lý đóng preview
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // Xử lý tải file lên
  const handleFileUpload = (event) => {
    // Xử lý việc tải file lên
    console.log('File được chọn:', event.target.files);
    // Implementation để tải lên dịch vụ lưu trữ sẽ được thêm ở đây
  };

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
              <MaterialCard 
                key={material.id} 
                material={material} 
                onPreview={handlePreview}
              />
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
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            multiple
          />
          <p className="mb-4 text-gray-500">Kéo và thả hoặc nhấp để chọn tệp</p>
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
          >
            Tải lên tài liệu
          </label>
        </div>
        <p className="mt-4 text-xs text-gray-500">Hỗ trợ định dạng: PDF, DOC, PPT, VIDEO</p>
      </div>
      
      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        file={previewFile}
      />
    </div>
  );
}
export default MaterialsPage;
