
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'vi' | 'en' | 'ja';

type Params = Record<string, string | number>;

const translations: Record<Language, Record<string, string>> = {
  en: {
    title: 'YouTube Playlist Roulette',
    subtitle: 'Add YouTube videos (at least {min}) and test your luck!',
    uploadButton: 'Upload URL List (.txt)',
    uploadNoUrls: 'No valid YouTube URLs found in file',
    uploadReadError: 'Error reading file',
    playlistTitle: 'Playlist',
    playlistPlaceholder: 'Paste a YouTube URL',
    add: 'Add',
    playlistEmpty: 'Your playlist is empty. Add some YouTube videos!',
    invalidUrl: 'Invalid URL',
    enterValidUrl: 'Please enter a valid YouTube URL',
    duplicateUrl: 'This URL is already in your playlist',
    songAdded: 'Song added to playlist',
    songRemoved: 'Song removed from playlist',
    downloadSuccess: 'Playlist downloaded successfully',
    spin: 'Spin & Play',
    spinning: 'Spinning...',
    needMoreVideos: 'You need at least {min} videos to play!',
    uploadTooFew: 'Added {count} videos. You need at least {min} for the game.',
    uploadSuccess: 'Playlist loaded with {count} videos!',
    noVideoSelected: 'No video selected',
    languageLabel: 'Language',
  },
  vi: {
    title: 'Vòng Xoay Danh Sách YouTube',
    subtitle: 'Thêm video YouTube (ít nhất {min}) và thử vận may của bạn!',
    uploadButton: 'Tải lên danh sách URL (.txt)',
    uploadNoUrls: 'Không tìm thấy URL YouTube hợp lệ trong tệp',
    uploadReadError: 'Lỗi khi đọc tệp',
    playlistTitle: 'Danh sách phát',
    playlistPlaceholder: 'Dán URL YouTube vào đây',
    add: 'Thêm',
    playlistEmpty: 'Danh sách trống. Hãy thêm video YouTube!',
    invalidUrl: 'URL không hợp lệ',
    enterValidUrl: 'Vui lòng nhập URL YouTube hợp lệ',
    duplicateUrl: 'URL này đã có trong danh sách của bạn',
    songAdded: 'Đã thêm bài hát vào danh sách',
    songRemoved: 'Đã xóa bài hát khỏi danh sách',
    downloadSuccess: 'Tải danh sách phát thành công',
    spin: 'Quay & Phát',
    spinning: 'Đang quay...',
    needMoreVideos: 'Bạn cần ít nhất {min} video để chơi!',
    uploadTooFew: 'Đã thêm {count} video. Bạn cần ít nhất {min} video để chơi.',
    uploadSuccess: 'Đã tải danh sách với {count} video!',
    noVideoSelected: 'Chưa chọn video nào',
    languageLabel: 'Ngôn ngữ',
  },
  ja: {
    title: 'YouTube プレイリスト・ルーレット',
    subtitle: 'YouTube動画を追加して（最低{min}曲）、運試しをしよう！',
    uploadButton: 'URLリストをアップロード (.txt)',
    uploadNoUrls: 'ファイルに有効なYouTube URLが見つかりません',
    uploadReadError: 'ファイルの読み込みエラー',
    playlistTitle: 'プレイリスト',
    playlistPlaceholder: 'YouTube URLを貼り付け',
    add: '追加',
    playlistEmpty: 'プレイリストは空です。YouTube動画を追加しよう！',
    invalidUrl: '無効なURL',
    enterValidUrl: '有効なYouTube URLを入力してください',
    duplicateUrl: 'このURLはすでにプレイリストにあります',
    songAdded: '曲をプレイリストに追加しました',
    songRemoved: '曲をプレイリストから削除しました',
    downloadSuccess: 'プレイリストをダウンロードしました',
    spin: 'ルーレット再生',
    spinning: '回転中...',
    needMoreVideos: 'プレイするには最低{min}曲の動画が必要です！',
    uploadTooFew: '{count}曲を追加しました。プレイには最低{min}曲必要です。',
    uploadSuccess: '{count}曲のプレイリストを読み込みました！',
    noVideoSelected: '動画が選択されていません',
    languageLabel: '言語',
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Params) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'playlist-roulette-language';

const detectInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'vi' || stored === 'en' || stored === 'ja') return stored;
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith('vi')) return 'vi';
    if (nav.startsWith('ja')) return 'ja';
  } catch {
    // localStorage unavailable — fall back to English
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Params): string => {
    let text = translations[language][key] ?? translations.en[key] ?? key;
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
      }
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
