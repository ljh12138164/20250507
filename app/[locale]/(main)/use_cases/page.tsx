import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'use_cases' });

  return {
    title: `${t('meta_title')} | PDF.ai`,
    description: t('meta_description'),
    keywords: [
      'PDF use cases',
      'document processing examples',
      'PDF.ai applications',
      'document workflows',
    ],
    alternates: {
      canonical: `https://pdf.ai/use_cases`,
      languages: {
        en: 'https://pdf.ai/en/use_cases',
        zh: 'https://pdf.ai/zh/use_cases',
      },
    },
  };
}

export default function UseCasesPage() {
  return <div>UseCasesPage</div>;
}
