
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { extractVideoId } from '@/utils/youtubeUtils';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

import FileUpload from '@/components/FileUpload';
import PlaylistManager from '@/components/PlaylistManager';
import Cylinder from '@/components/Cylinder';
import YoutubePlayer from '@/components/YoutubePlayer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const MINIMUM_SONG_COUNT = 2;

const Index = () => {
  const { t } = useLanguage();
  const [urls, setUrls] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const handleUrlsUploaded = (newUrls: string[]) => {
    setUrls(newUrls);

    if (newUrls.length < MINIMUM_SONG_COUNT) {
      toast.warning(t('uploadTooFew', { count: newUrls.length, min: MINIMUM_SONG_COUNT }));
    } else {
      toast.success(t('uploadSuccess', { count: newUrls.length }));
    }
  };

  const spinRoulette = () => {
    if (urls.length < MINIMUM_SONG_COUNT) {
      toast.error(t('needMoreVideos', { min: MINIMUM_SONG_COUNT }));
      return;
    }

    setSelectedVideoId(null);
    setSelectedIndex(null);
    setIsSpinning(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * urls.length);
      const selectedUrl = urls[randomIndex];
      const videoId = extractVideoId(selectedUrl);

      setSelectedIndex(randomIndex);
      setIsSpinning(false);

      if (videoId) {
        setTimeout(() => {
          setSelectedVideoId(videoId);
        }, 1000);
      }
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-roulette-dark text-white p-6">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <div className="flex justify-end mb-2">
          <LanguageSwitcher />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-red to-neon-purple bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-gray-400">
          {t('subtitle', { min: MINIMUM_SONG_COUNT })}
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <FileUpload onUrlsUploaded={handleUrlsUploaded} />

            <PlaylistManager
              urls={urls}
              onUrlsChange={setUrls}
            />

            <div className="mt-6 flex justify-center">
              <Button
                onClick={spinRoulette}
                disabled={urls.length < MINIMUM_SONG_COUNT || isSpinning}
                className={`
                  px-8 py-6 text-xl font-bold rounded-full shadow-lg
                  ${isSpinning ? 'bg-gray-700' : 'bg-neon-red hover:bg-red-600'}
                  transition-all duration-300 transform hover:scale-105
                  flex items-center gap-2
                `}
              >
                <Play size={24} />
                {isSpinning ? t('spinning') : t('spin')}
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <Cylinder
              isSpinning={isSpinning}
              selectedIndex={selectedIndex}
              songCount={urls.length || MINIMUM_SONG_COUNT}
            />

            <div className="mt-4">
              <YoutubePlayer videoId={selectedVideoId} />
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>YouTube Playlist Roulette &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
