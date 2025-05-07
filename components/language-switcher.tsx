'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { CircleFlag } from 'react-circle-flags';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const languages = [
    { code: 'en', name: 'EN', countryCode: 'us' },
    { code: 'zh', name: 'ZH-CN', countryCode: 'cn' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    // Reload the current page with the new locale
    router.refresh();
  };

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-1 h-8 px-2'
        >
          <CircleFlag
            countryCode={currentLanguage.countryCode}
            height={20}
            width={20}
            className='h-4 w-4'
          />
          <span className='font-medium'>{currentLanguage.name}</span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={
              locale === language.code ? 'bg-gray-100 font-medium' : ''
            }
            onClick={() => handleLanguageChange(language.code)}
          >
            <CircleFlag
              countryCode={language.countryCode}
              height={20}
              className='mr-2'
            />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
