'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/lib/i18n-navigation';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { CircleFlag } from 'react-circle-flags';

export function LanguageSwitcher() {
  const locale = useLocale();

  const languages = [
    { code: 'en', name: 'English', countryCode: 'us' },
    { code: 'zh', name: '简体中文', countryCode: 'cn' },
  ];

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
            asChild
          >
            <Link href='/' locale={language.code}>
              <CircleFlag
                countryCode={language.countryCode}
                height={20}
                width={20}
                className='mr-2 h-4 w-4'
              />
              {language.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
