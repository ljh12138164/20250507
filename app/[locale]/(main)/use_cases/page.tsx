import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('use_cases');

  return {
    title: `${t('meta_title')} | PDF.ai`,
    description: t('meta_description'),
    keywords: [
      'PDF use cases',
      'document processing examples',
      'PDF.ai applications',
      'document workflows',
    ],
  };
}

export default async function UseCasesPage() {
  return <div>UseCasesPage</div>;
}
