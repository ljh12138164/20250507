'use client';

import { useLocale } from './useLocale';
import translations from '@/lib/translations';

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key: string, params?: Record<string, string>) => {
    // 获取对应语言的翻译
    const localizedTranslations =
      translations[locale as keyof typeof translations] || translations.en;
    let text =
      localizedTranslations[key as keyof typeof localizedTranslations] ||
      translations.en[key as keyof typeof translations.en] ||
      key;

    // 替换参数
    if (params) {
      Object.keys(params).forEach((param) => {
        text = text.replace(`{{${param}}}`, params[param]);
      });
    }

    return text;
  };

  return { t };
}
