import Footer from '@/components/home/Footer';
import Nav from '@/components/home/Nav';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const tiempos = localFont({
  src: './font.woff2',
  variable: '--font-tiempos',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PDF.ai - AI Powered Document Assistant',
  description:
    'AI-powered PDF document assistant for efficient document analysis and interaction',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body
        className={`${tiempos.variable} ${inter.variable} ${notoSansSC.variable} antialiased [font-family:var(--font-tiempos),var(--font-noto-sans-sc),var(--font-inter),"Segoe_UI","Helvetica_Neue",sans-serif] `}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <main className='bg-[rgb(247,245,238)] min-h-[calc(100vh-64px)]'>
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
