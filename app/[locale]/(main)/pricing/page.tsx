import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return {
    title: `${t('meta_title')} | PDF.ai`,
    description: t('meta_description'),
    keywords: [
      'PDF pricing',
      'PDF tool pricing',
      'PDF.ai plans',
      'document processing price',
    ],
  };
}

export default function PricingPage() {
  return <div>PricingPage</div>;
}
