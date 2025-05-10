import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 用于国际化路由的配置
  locales,
  defaultLocale,
  // 这将自动检测用户首选语言
  localeDetection: true,
  // 默认语言不添加前缀
  localePrefix: 'as-needed',
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next`, `/_vercel`, `/public`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|public|favicon.ico|.*\\..*).*)',
};
