import { Separator } from './ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import Images from '@/public/favicon.ico';

export default function Footer() {
  return (
    <>
      <Separator className='my-2' />
      <footer className='container mx-auto py-12 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* 第一列 - 品牌 */}
          <div className='flex flex-col space-y-4'>
            <Link href='/'>
              <Image
                width={48}
                src={Images}
                alt='图标'
                height={48}
                className='w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center'
              />
            </Link>
            <p className='text-gray-700 mt-4'>
              与任何 PDF 聊天：提出问题、获取摘要、查找信息等。
            </p>
            <div className='flex space-x-4 mt-4'>
              <Link href='#' aria-label='TikTok'>
                <div className='w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center'>
                  <span className='text-xl'>♪</span>
                </div>
              </Link>
              <Link href='#' aria-label='Instagram'>
                <div className='w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center'>
                  <span className='text-xl'>ⓘ</span>
                </div>
              </Link>
              <Link href='#' aria-label='Twitter'>
                <div className='w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center'>
                  <span className='text-xl'>𝕏</span>
                </div>
              </Link>
              <Link href='#' aria-label='YouTube'>
                <div className='w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center'>
                  <span className='text-xl'>▶</span>
                </div>
              </Link>
            </div>
          </div>

          {/* 第二列 - 产品 */}
          <div>
            <h3 className='text-lg font-medium mb-4'>产品</h3>
            <div className='space-y-3'>
              <Link href='#' className='block text-gray-700'>
                用例
              </Link>
              <Link href='#' className='block text-gray-700'>
                Chrome 扩展程序
              </Link>
              <Link href='#' className='block text-gray-700'>
                API 中心
              </Link>
              <Link href='#' className='block text-gray-700'>
                定价
              </Link>
              <Link href='#' className='block text-gray-700'>
                视频教程
              </Link>
              <Link href='#' className='block text-gray-700'>
                资源
              </Link>
              <Link href='#' className='block text-gray-700'>
                博客
              </Link>
              <Link href='#' className='block text-gray-700'>
                常见问题
              </Link>
            </div>
          </div>

          {/* 第三列 - 我们还建造了 */}
          <div>
            <h3 className='text-lg font-medium mb-4'>我们还建造了</h3>
            <div className='space-y-3'>
              <Link href='#' className='block text-gray-700'>
                简历AI扫描仪
              </Link>
              <Link href='#' className='block text-gray-700'>
                发票AI扫描仪
              </Link>
              <Link href='#' className='block text-gray-700'>
                人工智能测验生成器
              </Link>
              <Link href='#' className='block text-gray-700'>
                QuickyAI
              </Link>
              <Link href='#' className='block text-gray-700'>
                教义
              </Link>
              <Link href='#' className='block text-gray-700'>
                PDF GPT
              </Link>
              <Link href='#' className='block text-gray-700'>
                PDF AI 生成器
              </Link>
              <Link href='#' className='block text-gray-700'>
                其他 PDF 工具
              </Link>
            </div>
          </div>

          {/* 第四列 - 公司 */}
          <div>
            <h3 className='text-lg font-medium mb-4'>公司</h3>
            <div className='space-y-3'>
              <Link href='#' className='block text-gray-700'>
                PDF.ai 与 ChatPDF 对比
              </Link>
              <Link href='#' className='block text-gray-700'>
                PDF.ai 与 Acrobat Reader
              </Link>
              <Link href='#' className='block text-gray-700'>
                合法的
              </Link>
              <Link href='#' className='block text-gray-700'>
                联盟计划💰
              </Link>
              <Link href='#' className='block text-gray-700'>
                投资者
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
