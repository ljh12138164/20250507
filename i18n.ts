import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh'];
export const defaultLocale = 'zh';

export default getRequestConfig(async ({ locale }) => {
  // 如果locale未定义，使用默认语言
  const resolvedLocale = locale || defaultLocale;
  // console.log(resolvedLocale);
  if (resolvedLocale !== 'zh' && resolvedLocale !== 'en') {
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default,
    };
  }
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
