import { Separator } from '../ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import Images from '@/public/favicon.ico';
import { FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa6';
import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  return (
    <>
      <Separator className='my-[48px] opacity-75' />
      <footer className=' px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4  gap-8'>
          {/* 第一列 - 品牌 */}
          <section className='flex flex-col space-y-4 col-span-1 md:col-span-3 xl:col-span-1 text-[14px]'>
            <Link href='/'>
              <Image
                width={28}
                src={Images}
                alt='图标'
                height={28}
                className='w-[28px] h-[28px] bg-slate-800 rounded-full flex items-center justify-center'
              />
            </Link>
            <p className='text-gray-700'>{t('chat_with_pdf')}</p>
            <div className='flex space-x-4 mt-4'>
              <Link href='#' aria-label='TikTok'>
                <div className=' opacity-40 hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center'>
                  <FaTiktok
                    width={48}
                    height={48}
                    className='w-[24px] h-[24px]'
                  />
                </div>
              </Link>
              <Link href='#' aria-label='Instagram'>
                <div className=' opacity-40 hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center'>
                  <FaInstagram
                    width={48}
                    height={48}
                    className='w-[24px] h-[24px]'
                  />
                </div>
              </Link>
              <Link href='#' aria-label='Twitter'>
                <div className=' opacity-40 hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center'>
                  <FaTwitter
                    width={48}
                    height={48}
                    className='w-[24px] h-[24px]'
                  />
                </div>
              </Link>
              <Link href='#' aria-label='YouTube'>
                <div className=' opacity-40 hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center'>
                  <FaYoutube
                    width={48}
                    height={48}
                    className='w-[24px] h-[24px]'
                  />
                </div>
              </Link>
            </div>
          </section>

          {/* 第二列 - 产品 */}
          <section className='text-[14px] '>
            <h3 className='text-[14px] font-bold mb-4'>{t('products')}</h3>
            <div className='space-y-3'>
              <Link href='#' className='block text-gray-700'>
                {t('use_cases', { ns: 'nav' })}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('chrome_extension', { ns: 'nav' })}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('api_hub', { ns: 'nav' })}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('pricing', { ns: 'nav' })}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('video_tutorials')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('resources')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('blog')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('faq')}
              </Link>
            </div>
          </section>

          {/* 第三列 - 我们还建造了 */}
          <section className='text-[14px]'>
            <h3 className='text-lg  mb-4 font-bold'>{t('we_also_built')}</h3>
            <div className='space-y-3'>
              <Link href='#' className='block text-gray-700'>
                {t('resume_ai_scanner')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('invoice_ai_scanner')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('ai_quiz_generator')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('quicky_ai')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('doctrines')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('pdf_gpt')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('pdf_ai_generator')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('other_pdf_tools')}
              </Link>
            </div>
          </section>

          {/* 第四列 - 公司 */}
          <section className='text-[14px]'>
            <h3 className='text-lg font-bold mb-4'>{t('company')}</h3>
            <div className='space-y-3'>
              <Link href='#' className='block text-gray-700'>
                {t('vs_chatpdf')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('vs_acrobat')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('legal')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('affiliate_program')}
              </Link>
              <Link href='#' className='block text-gray-700'>
                {t('investors')}
              </Link>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
}
