// Cache lưu trữ kết quả dịch gần đây để tăng tốc
const translationCache = new Map();
const cacheTimeout = 30 * 60 * 1000; // 30 phút

// Hàm kiểm tra và lấy dữ liệu từ cache
const getFromCache = (sourceLang, targetLang, text) => {
  const cacheKey = `${sourceLang}-${targetLang}-${text}`;
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    const now = Date.now();
    if (now - cached.timestamp <= cacheTimeout) {
      return cached.translation;
    } else {
      translationCache.delete(cacheKey);
    }
  }
  return null;
};

// Hàm lưu dữ liệu vào cache
const saveToCache = (sourceLang, targetLang, text, translation) => {
  const cacheKey = `${sourceLang}-${targetLang}-${text}`;
  translationCache.set(cacheKey, {
    translation,
    timestamp: Date.now(),
  });
};

// Hàm dọn dẹp cache hết hạn
const cleanupCache = () => {
  const now = Date.now();
  translationCache.forEach((value, key) => {
    if (now - value.timestamp > cacheTimeout) {
      translationCache.delete(key);
    }
  });
};

export { translationCache, getFromCache, saveToCache, cleanupCache };
