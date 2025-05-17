import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import TranslationModeToggle from '../components/Translate/TranslationModeToggle';
import LanguageSelector from '../components/Translate/LanguageSelector';
import TextTranslationPanel from '../components/Translate/TextTranslationPanel';
import ImageTranslationPanel from '../components/Translate/ImageTranslationPanel';
import {
  getFromCache,
  saveToCache,
  cleanupCache,
} from '../components/Translate/TranslationCache';

const LINGVA_API_URL = 'https://lingva.ml/api/v1';

const OCR_API_KEY = 'K82693015488957';
const OCR_API_URL = 'https://api.ocr.space/parse/image';

const DEFAULT_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
];

const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('vi');
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState(DEFAULT_LANGUAGES);
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [activeMode, setActiveMode] = useState('text'); // 'text' hoặc 'image'

  const translationTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const location = useLocation();

  // Process URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSourceText(query);
      handleTextChange(query);
    }
  }, [location.search]);

  // Fetch languages khi component mount
  useEffect(() => {
    fetchLanguages();

    // Cleanup cache hết hạn
    const cleanupInterval = setInterval(() => {
      cleanupCache();
    }, 5 * 60 * 1000); // 5 phút

    return () => {
      clearInterval(cleanupInterval);
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
    };
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${LINGVA_API_URL}/languages`);
      if (!response.ok) throw new Error('Failed to fetch languages');
      const data = await response.json();
      setLanguages(data.languages || DEFAULT_LANGUAGES);
    } catch (error) {
      console.error('Error fetching languages:', error);
      setError(
        'Không thể tải danh sách ngôn ngữ. Đang sử dụng danh sách mặc định.',
      );
    }
  };

  // Debounced translation để tăng tốc và giảm số lượng request
  const debouncedTranslate = useCallback((text, source, target) => {
    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
    }

    if (!text.trim()) {
      setTranslatedText('');
      return;
    }

    // Kiểm tra cache
    const cachedTranslation = getFromCache(source, target, text);
    if (cachedTranslation) {
      setTranslatedText(cachedTranslation);
      return;
    }

    translationTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${LINGVA_API_URL}/${source}/${target}/${encodeURIComponent(text)}`,
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Translation failed');
        }

        const data = await response.json();

        if (data && data.translation) {
          setTranslatedText(data.translation);

          // Lưu vào cache
          saveToCache(source, target, text, data.translation);
        } else {
          throw new Error('Không nhận được kết quả dịch');
        }
      } catch (error) {
        console.error('Lỗi khi dịch:', error);
        setError('Có lỗi xảy ra khi dịch. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce
  }, []);

  // Sử dụng debounced translation khi text thay đổi
  useEffect(() => {
    if (sourceText.trim()) {
      debouncedTranslate(sourceText, sourceLang, targetLang);
    } else {
      setTranslatedText('');
    }
  }, [sourceText, sourceLang, targetLang, debouncedTranslate]);

  const detectLanguage = async (text) => {
    if (!text.trim()) return;
    setIsDetecting(true);

    try {
      const response = await fetch(`${LINGVA_API_URL}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      if (!response.ok) throw new Error('Language detection failed');

      const data = await response.json();
      if (data && data.lang) {
        setDetectedLanguage(data);
        setSourceLang(data.lang);
        return data.lang;
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      setError('Không thể phát hiện ngôn ngữ');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleTextChange = async (text) => {
    setSourceText(text);

    // Auto detect language for long text
    if (text.length > 50 && text !== translatedText) {
      await detectLanguage(text);
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);

    setSourceText(translatedText);
    setTranslatedText('');
    setError('');
    setDetectedLanguage(null);
  };

  // Image translation functions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Chỉ chấp nhận image files
    if (!file.type.match('image.*')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Reset error
    setError('');
  };

  const handleExtractTextFromImage = async () => {
    if (!selectedImage) return;

    setIsProcessingImage(true);
    setError('');

    try {
      // Create form data for OCR API
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('apikey', OCR_API_KEY);
      formData.append('language', sourceLang === 'en' ? 'eng' : sourceLang);
      formData.append('isOverlayRequired', 'false');

      // Call OCR API
      const response = await axios.post(OCR_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (
        response.data &&
        response.data.ParsedResults &&
        response.data.ParsedResults.length > 0
      ) {
        const extractedText = response.data.ParsedResults[0].ParsedText;

        if (extractedText.trim()) {
          // Set extracted text and trigger translation
          setSourceText(extractedText);
          // Language detection happens automatically in the useEffect
        } else {
          setError('Không thể trích xuất văn bản từ ảnh');
        }
      } else {
        setError('Không thể xử lý ảnh. Vui lòng thử lại với ảnh khác.');
      }
    } catch (error) {
      console.error('Lỗi khi trích xuất văn bản từ ảnh:', error);
      setError('Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại sau.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Dịch văn bản</h1>

        {/* Toggle between text and image translation */}
        <TranslationModeToggle
          activeMode={activeMode}
          setActiveMode={setActiveMode}
        />

        {/* Language selectors */}
        <LanguageSelector
          sourceLang={sourceLang}
          targetLang={targetLang}
          languages={languages}
          detectedLanguage={detectedLanguage}
          setSourceLang={setSourceLang}
          setTargetLang={setTargetLang}
          handleSwapLanguages={handleSwapLanguages}
        />

        {/* Render appropriate panel based on active mode */}
        {activeMode === 'text' ? (
          <TextTranslationPanel
            sourceText={sourceText}
            translatedText={translatedText}
            isLoading={isLoading}
            isDetecting={isDetecting}
            error={error}
            handleTextChange={handleTextChange}
          />
        ) : (
          <ImageTranslationPanel
            sourceText={sourceText}
            translatedText={translatedText}
            imagePreview={imagePreview}
            isLoading={isLoading}
            isProcessingImage={isProcessingImage}
            error={error}
            handleTextChange={handleTextChange}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
            handleExtractTextFromImage={handleExtractTextFromImage}
            fileInputRef={fileInputRef}
          />
        )}
      </div>
    </div>
  );
};

export default TranslatePage;
