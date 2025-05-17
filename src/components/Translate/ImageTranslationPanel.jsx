import React from 'react';

const ImageTranslationPanel = ({
  sourceText,
  translatedText,
  imagePreview,
  isLoading,
  isProcessingImage,
  error,
  handleTextChange,
  handleImageUpload,
  handleRemoveImage,
  handleExtractTextFromImage,
  fileInputRef,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />

          {!imagePreview ? (
            <div
              className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => fileInputRef.current.click()}
            >
              <svg
                className="h-12 w-12 text-gray-400 mb-2"
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
              <p className="text-gray-500 text-center">
                Nhấp để tải ảnh vào đây
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Hỗ trợ định dạng: JPG, PNG
              </p>
            </div>
          ) : (
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleExtractTextFromImage}
          disabled={!imagePreview || isProcessingImage}
          className={`rounded-lg px-4 py-2 text-white ${
            !imagePreview || isProcessingImage
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isProcessingImage
            ? 'Đang xử lý ảnh...'
            : 'Trích xuất văn bản từ ảnh'}
        </button>
      </div>

      <div>
        <textarea
          value={sourceText}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Văn bản trích xuất từ ảnh sẽ hiển thị ở đây..."
          className="h-32 w-full rounded-lg border border-gray-300 p-4 focus:border-orange-500 focus:outline-none"
        ></textarea>

        <div className="mt-4">
          <textarea
            value={translatedText}
            readOnly
            placeholder="Bản dịch sẽ hiển thị ở đây..."
            className="h-32 w-full rounded-lg border border-gray-300 p-4 bg-gray-50"
          ></textarea>
        </div>

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        {isLoading && (
          <p className="mt-2 text-gray-500 text-sm">Đang dịch...</p>
        )}
      </div>
    </div>
  );
};

export default ImageTranslationPanel;
