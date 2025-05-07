import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: `PDF.ai - ${t('meta_title')}`,
    description: t('meta_description'),
    keywords: [
      'PDF tools',
      'PDF processor',
      'document assistant',
      'PDF rotation',
      'PDF.ai',
    ],
  };
}

export default function Home() {
  const t = useTranslations();
  return (
    <div className='flex flex-col items-center justify-center p-4 h-[calc(100vh-64px)]'>
      <h1 className='text-4xl font-bold mb-6 text-center'>PDF.ai</h1>
      <p className='text-xl text-center max-w-2xl mb-8'>
        {t('home.description')}
      </p>
      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
        <Button
          asChild
          className='px-6 py-3 cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 transition-colors w-full'
        >
          <Link href='/rotate'>{t('rotate.title')}</Link>
        </Button>
      </div>
    </div>
  );
}
