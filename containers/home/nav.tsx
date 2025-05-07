'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/containers/home/language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const navItems = [
    { name: t('pricing'), key: 'pricing' },
    { name: t('chrome_extension'), key: 'chrome_extension' },
    { name: t('use_cases'), key: 'use_cases' },
    { name: t('api_hub'), key: 'api_hub' },
  ];

  return (
    <nav className='flex items-center justify-between w-full px-4 py-3 bg-white border-b'>
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
        <span
          className='ml-2 text-xl font-bold'
          onClick={() => router.push('/')}
        >
          PDF.ai
        </span>
      </Link>
      <div className='flex items-center space-x-2'>
        <div className='hidden md:flex space-x-1'>
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant='ghost'
              size='sm'
              asChild
              className={cn(
                'font-bold relative group',
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
        <LanguageSwitcher />
        <Link href='/get-started' className='font-bold'>
          {t('get_started')} →
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>{t('toggle_menu')}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right'>
            <SheetHeader className='mb-4'>
              <SheetTitle onClick={() => router.push('/')}>PDF.ai</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col space-y-2'>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant='ghost'
                  asChild
                  className={cn(
                    'justify-start',
                    pathname === item.key && 'bg-accent text-accent-foreground '
                  )}
                >
                  <Link href={item.key}>{item.name}</Link>
                </Button>
              ))}
              <Link href='/get-started' className='font-bold'>
                {t('get_started')} →
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
