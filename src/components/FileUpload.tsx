
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { parseUrlsFromText } from '@/utils/youtubeUtils';
import { useLanguage } from '@/context/LanguageContext';

interface FileUploadProps {
  onUrlsUploaded: (urls: string[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUrlsUploaded }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const urls = parseUrlsFromText(text);

      if (urls.length === 0) {
        setError(t('uploadNoUrls'));
        return;
      }

      onUrlsUploaded(urls);
    } catch (err) {
      setError(t('uploadReadError'));
      console.error(err);
    } finally {
      setIsLoading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mb-6">
      <input
        ref={fileInputRef}
        type="file"
        id="file-upload"
        accept=".txt"
        onChange={handleFileChange}
        className="sr-only"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
        className="border-neon-purple hover:bg-neon-purple/20 transition-all"
      >
        {isLoading ? "Loading..." : t('uploadButton')}
      </Button>

      {error && (
        <p className="text-red-500 mt-2 text-sm">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;

