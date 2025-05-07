import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'zh' as const;

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
});
