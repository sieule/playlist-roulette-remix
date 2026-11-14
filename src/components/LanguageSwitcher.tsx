
import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const options: { code: Language; label: string }[] = [
  { code: 'vi', label: 'VI' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label={t('languageLabel')}
    >
      <Languages size={18} className="text-gray-400" aria-hidden="true" />
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLanguage(opt.code)}
          aria-pressed={language === opt.code}
          className={cn(
            'px-3 py-1 rounded-full text-xs font-bold tracking-wide border transition-all',
            language === opt.code
              ? 'bg-neon-red border-neon-red text-white shadow-[0_0_10px_rgba(255,0,0,0.5)]'
              : 'border-gray-600 text-gray-400 hover:border-neon-purple hover:text-neon-purple hover:bg-neon-purple/10',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
