'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t('pricing'), key: 'pricing' },
    { name: t('chrome_extension'), key: 'chrome_extension' },
    { name: t('use_cases'), key: 'use_cases' },
    { name: t('api_hub'), key: 'hub' },
  ];

  return (
    <nav className='flex items-center justify-between w-full p-[10px] bg-white border-b h-[70px] relative'>
      <Link href='/' className='flex items-center'>
        <svg
          viewBox='0 0 64 36'
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
        >
          <path
            fill='black'
            d='M41.3111 0H37.6444C30.3111 0 24.6889 4.15556 21.7556 9.28889C18.8222 3.91111 12.9556 0 5.86667 0H2.2C0.977781 0 0 0.977779 0 2.2V5.86667C0 16.1333 8.31111 24.2 18.3333 24.2H19.8V33C19.8 34.2222 20.7778 35.2 22 35.2C23.2222 35.2 24.2 34.2222 24.2 33V24.2H25.6667C35.6889 24.2 44 16.1333 44 5.86667V2.2C43.5111 0.977779 42.5333 0 41.3111 0ZM19.3111 19.5556H17.8444C10.2667 19.5556 4.15556 13.4444 4.15556 5.86667V4.4H5.62222C13.2 4.4 19.3111 10.5111 19.3111 18.0889V19.5556ZM39.1111 5.86667C39.1111 13.4444 33 19.5556 25.4222 19.5556H23.9556V18.0889C23.9556 10.5111 30.0667 4.4 37.6444 4.4H39.1111V5.86667Z'
          ></path>
        </svg>
        <span className='text-xl font-bold' onClick={() => router.push('/')}>
          PDF.ai
        </span>
      </Link>
      <div className='flex items-center   space-x-2'>
        <div className='hidden md:flex gap-2'>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant='ghost'
              size='sm'
              asChild
              className={cn(
                'font-bold relative group py-[4px] px-[6px] text-[14px]',
                pathname === item.key && 'bg-accent text-accent-foreground '
              )}
            >
              <Link href={item.key} className='flex flex-col'>
                {item.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </Button>
          ))}
        </div>
        <section className='hidden md:flex'>
          <LanguageSwitcher />
        </section>
        <Link href='/get-started' className='font-bold hidden md:flex'>
          {t('get_started')} →
        </Link>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden cursor-pointer'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className='h-8 w-8' />
          ) : (
            <Menu className='h-8 w-8' />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className='absolute top-[70px] left-0 right-0 bg-white shadow-md md:hidden flex flex-col p-4 space-y-2 z-50'>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant='ghost'
              asChild
              className={cn(
                'justify-start text-left py-3 px-4 font-medium',
                pathname === item.key && 'bg-accent text-accent-foreground '
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href={item.key}>{item.name}</Link>
            </Button>
          ))}
          <div className='px-4 py-2'>
            <LanguageSwitcher />
          </div>
          <Link
            href='/get-started'
            className='font-bold block py-3 px-4 text-left hover:bg-gray-100 rounded'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('get_started')} →
          </Link>
        </div>
      )}
    </nav>
  );
}
