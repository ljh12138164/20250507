import RotatePDF from '@/components/home/Main';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rotate' });

  return {
    title: `${t('meta_title')} | PDF.ai`,
    description: t('meta_description'),
    keywords: [
      'rotate PDF',
      'PDF page rotation',
      'change PDF orientation',
      'fix PDF page direction',
    ],
  };
}
if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function <T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { resolve: resolve!, reject: reject!, promise };
  };
}
const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rotate' });
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 py-20'>
        <h1 className='text-[48px] font-700 mb-6 text-center'>{t('title')}</h1>
        <p className='text-[16px] text-center max-w-2xl mb-4'>
          {t('description')}
        </p>
        <RotatePDF />
      </div>
    </>
  );
};
export default Page;
