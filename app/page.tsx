'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4'>
      <h1 className='text-4xl font-bold mb-6 text-center'>PDF.ai</h1>
      <p className='text-xl text-center max-w-2xl mb-8'>
        AI 驱动的 PDF 文档助手，让文档分析和交互更高效
      </p>
      <div className='flex space-x-4'>
        <button className='px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'>
          {t('get_started')}
        </button>
      </div>
    </div>
  );
}
