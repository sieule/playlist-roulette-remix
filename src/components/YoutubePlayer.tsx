
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface YoutubePlayerProps {
  videoId: string | null;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  const { t } = useLanguage();

  if (!videoId) {
    return (
      <div className="youtube-container bg-gray-900 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">{t('noVideoSelected')}</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="youtube-container rounded-lg overflow-hidden shadow-2xl border border-gray-700">
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default YoutubePlayer;
