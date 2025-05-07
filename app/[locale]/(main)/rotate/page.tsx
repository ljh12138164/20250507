import RotatePDF from '@/components/RotatePDF';
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
const Page = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 '>
        <h1 className='text-4xl font-bold mb-6 text-center'>旋转 PDF 页面</h1>
        <p className='text-lg text-center max-w-2xl mb-8'>
          只需点击页面即可旋转。然后，您就可以下载修改后的 PDF。
        </p>
        <RotatePDF />
      </div>
    </>
  );
};
export default Page;
