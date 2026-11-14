import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Download } from 'lucide-react';
import { extractVideoId, isValidYoutubeUrl } from '@/utils/youtubeUtils';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

interface PlaylistManagerProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({ urls, onUrlsChange }) => {
  const { t } = useLanguage();
  const [newUrl, setNewUrl] = useState('');

  const handleUrlAdd = () => {
    if (!isValidYoutubeUrl(newUrl)) {
      toast.error(t('enterValidUrl'));
      return;
    }

    if (urls.includes(newUrl)) {
      toast.error(t('duplicateUrl'));
      return;
    }

    onUrlsChange([...urls, newUrl]);
    setNewUrl('');
    toast.success(t('songAdded'));
  };

  const handleUrlRemove = (index: number) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    onUrlsChange(newUrls);
    toast.success(t('songRemoved'));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlAdd();
    }
  };

  const handleDownload = () => {
    const content = urls.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playlist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success(t('downloadSuccess'));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{t('playlistTitle')}</h2>
        {urls.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            className="text-neon-purple hover:bg-neon-purple/20"
          >
            <Download size={18} />
          </Button>
        )}
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('playlistPlaceholder')}
          className="flex-1"
        />
        <Button 
          onClick={handleUrlAdd}
          className="bg-neon-purple hover:bg-neon-purple/80"
        >
          {t('add')}
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto p-2">
        {urls.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            {t('playlistEmpty')}
          </p>
        ) : (
          urls.map((url, index) => {
            const videoId = extractVideoId(url);
            return (
              <div 
                key={index}
                className="flex justify-between items-center p-2 bg-secondary rounded-md"
              >
                <div className="truncate flex-1 pr-2">
                  <span className="mr-2 text-neon-purple font-bold">{index + 1}.</span>
                  {videoId ? (
                    <span className="text-sm">{videoId}</span>
                  ) : (
                    <span className="text-red-400 text-sm">{t('invalidUrl')}</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUrlRemove(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlaylistManager;
