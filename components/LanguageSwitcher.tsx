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
    { code: 'en', name: 'EN', countryCode: 'us', key: 'English' },
    { code: 'zh', name: 'ZH-CN', countryCode: 'cn', key: 'Chinese' },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-1 h-8 '
        >
          <CircleFlag
            countryCode={currentLanguage.countryCode}
            height={24}
            width={24}
            className='h-[24px] w-[24px]'
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
              {language.key}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
