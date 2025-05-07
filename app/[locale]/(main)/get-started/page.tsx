import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'get_started' });

  return {
    title: `${t('meta_title')} | PDF.ai`,
    description: t('meta_description'),
    keywords: [
      'get started PDF.ai',
      'PDF processing',
      'document tools',
      'PDF workflow',
    ],
  };
}

export default function GetStartedPage() {
  return <div>GetStartedPage</div>;
}
