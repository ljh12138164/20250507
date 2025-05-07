'use client';

import { useTranslations } from 'next-intl';

export function useTranslation() {
  const t = useTranslations('nav');

  return { t };
}
