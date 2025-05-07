'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/language-switcher';
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
  const { t } = useTranslation();

  const navItems = [
    { name: t('pricing'), href: '/pricing' },
    { name: t('chrome_extension'), href: '/chrome-extension' },
    { name: t('use_cases'), href: '/use-cases' },
    { name: t('api_hub'), href: '/api-hub' },
  ];

  return (
    <nav className='flex items-center justify-between w-full px-4 py-3 bg-white border-b'>
      <Link href='/' className='flex items-center'>
        <svg
          className='h-8 w-8'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 2L2 7L12 12L22 7L12 2Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2 17L12 22L22 17'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2 12L12 17L22 12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span className='ml-2 text-xl font-bold'>PDF.ai</span>
      </Link>
      <div className='flex items-center space-x-2'>
        <div className='hidden md:flex space-x-1'>
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant='ghost'
              size='sm'
              asChild
              className={cn(
                'font-normal',
                pathname === item.href &&
                  'bg-accent text-accent-foreground font-medium'
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <LanguageSwitcher />
        <Button asChild size='sm' className='hidden md:flex'>
          <Link href='/get-started'>{t('get_started')} →</Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right'>
            <SheetHeader className='mb-4'>
              <SheetTitle>PDF.ai</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col space-y-2'>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  asChild
                  className={cn(
                    'justify-start',
                    pathname === item.href &&
                      'bg-accent text-accent-foreground font-medium'
                  )}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
              <Button asChild className='mt-4'>
                <Link href='/get-started'>{t('get_started')} →</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
