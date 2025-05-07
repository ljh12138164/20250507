'use client';

import { Loader2 } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { useRef, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import {
  HiMagnifyingGlassPlus,
  HiOutlineMagnifyingGlassMinus,
} from 'react-icons/hi2';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Render from '../Render';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function RotatePDF() {
  const t = useTranslations('rotate');

  // 拖拽
  const [isDragging, setIsDragging] = useState(false);
  // 文件
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy | null>(
    null
  );
  // 加载
  const [isLoading, setIsLoading] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>(150);
  const [pageHeight, setPageHeight] = useState<number>(220);
  const [pdfList, setPdfList] = useState<
    { image: string; page: number; rotate: number }[]
  >([]);

  // 文件输入
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 拖拽
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setPdfFile(files[0]);
      loadPdfDocument(files[0]);
    }
  };

  // 文件输入
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type === 'application/pdf') {
      setPdfFile(files[0]);
      loadPdfDocument(files[0]);
    }
    e.target.value = '';
  };

  // 加载PDF文档
  const loadPdfDocument = async (file: File) => {
    try {
      setIsLoading(true);
      const arrayBuffer = await file.arrayBuffer();
      const { GlobalWorkerOptions } = pdfjs;
      // 加载前设置worker路径
      GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      setPdfDocument(pdf);

      const pdfLoadList: { image: string; page: number; rotate: number }[] = [];
      // 遍历每一页
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        // 创建canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        if (!context) continue;
        // 渲染PDF页面到canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
        // 转换为图片
        const image = canvas.toDataURL('image/png');
        pdfLoadList.push({ image, page: pageNumber, rotate: 0 });
      }
      setPdfList(pdfLoadList);
    } catch (error) {
      console.error('加载PDF出错:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 旋转功能，后面可以扩展为顺时针和逆时针
  const handleRotate = (
    page: number,
    direction: 'clockwise' | 'counterclockwise'
  ) => {
    const newPdfList = pdfList.map((item) => {
      if (item.page === page) {
        return {
          ...item,
          rotate:
            direction === 'clockwise' ? item.rotate + 90 : item.rotate - 90,
        };
      }
      return item;
    });
    setPdfList(newPdfList);
  };

  const handleRotateAll = () => {
    const newPdfList = pdfList.map((item) => ({
      ...item,
      rotate: item.rotate + 90,
    }));
    setPdfList(newPdfList);
  };

  // 放大功能
  const handleZoomIn = () => {
    setPageWidth((prev) => Math.min(prev + 50, 500));
    setPageHeight((prev) => Math.min(prev + 70, 700));
  };
  // 缩小功能
  const handleZoomOut = () => {
    setPageWidth((prev) => Math.max(prev - 50, 100));
    setPageHeight((prev) => Math.max(prev - 70, 150));
  };
  // 清除文件
  const clearFile = () => {
    setPdfFile(null);
    setPdfDocument(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = async () => {
    if (!pdfFile) return;
    const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());
    const pages = pdfDoc.getPages();
    pages.forEach((page, index) => {
      const rotation = pdfList.find((item) => item.page === index + 1)?.rotate;
      if (rotation) {
        page.setRotation(degrees(rotation));
      }
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `旋转_${pdfFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 按钮区域 UI
  const ActionButtons = () => (
    <div className='flex justify-center items-center w-full gap-2 mb-4'>
      <Button
        className='flex items-center justify-center bg-[#ff6b35] text-white font-medium rounded px-4 py-2 hover:bg-[#e85a2a] transition-colors'
        disabled={isLoading}
        onClick={() => {
          handleRotateAll();
        }}
      >
        {t('rotate_all')}
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={clearFile}
              className='flex items-center justify-center  text-white font-medium rounded px-4 py-2  transition-colors'
            >
              {t('delete_pdf')}
            </Button>
            <TooltipContent>
              <p>{t('delete_pdf_tooltip')}</p>
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={handleZoomIn}
              className='flex items-center justify-center bg-[#f5f5f5] text-[#333] rounded-full w-10 h-10 hover:bg-[#e0e0e0] transition-colors cursor-pointer'
              disabled={pageWidth >= 500 || isLoading}
            >
              <HiMagnifyingGlassPlus />
            </Button>
            <TooltipContent>
              <p>{t('zoom_in_tooltip')}</p>
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={handleZoomOut}
              className='flex items-center justify-center bg-[#f5f5f5] text-[#333] rounded-full w-10 h-10 hover:bg-[#e0e0e0] transition-colors cursor-pointer'
              disabled={pageWidth <= 100 || isLoading}
            >
              <HiOutlineMagnifyingGlassMinus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('zoom_out_tooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  // 没有文件时
  if (!pdfFile) {
    return (
      <div className='flex flex-col items-center justify-center p-4 '>
        <label
          className={`border-2 border-dashed rounded-md p-10 w-[275px] h-[375px] flex flex-col items-center justify-center cursor-pointer bg-white ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-4 text-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-8 h-8 text-black'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                ></path>
              </svg>
            </div>
            <p className=' text-center font-bold'>单击上传或拖放</p>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='.pdf'
              className='hidden'
            />
          </div>
        </label>
      </div>
    );
  }
  return (
    <div className='flex flex-col p-4 min-h-[calc(100dvh-100px)] '>
      <ActionButtons />

      <div className='w-full'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center p-12'>
            <Loader2 className='w-10 h-10 text-blue-500 animate-spin mb-2' />
            <p className='text-gray-600'>正在加载PDF...</p>
          </div>
        ) : (
          <div className='w-full'>
            {pdfDocument && (
              <div className='flex flex-wrap justify-center gap-4'>
                {pdfList.map(({ image, page, rotate }) => (
                  <div
                    key={page}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRotate(page, 'clockwise');
                    }}
                    className={`relative  cursor-pointer flex flex-col overflow-hidden items-center border rounded-md bg-white p-2 hover:shadow-md `}
                  >
                    <div
                      style={{
                        transform: `rotate(${rotate}deg)`,
                        transition: 'transform 0.3s ease-in-out',
                        transformOrigin: 'center center',
                      }}
                    >
                      <Render
                        image={image}
                        width={pageWidth}
                        height={pageHeight}
                      />
                    </div>
                    <div
                      className='absolute top-2 right-2  text-xs p-1 rounded-full bg-[rgb(255,97,47)]'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotate(page, 'clockwise');
                      }}
                    >
                      <FiRefreshCw className='text-white' />
                    </div>
                    <div className='flex flex-col w-full mt-2 gap-1'>
                      <div className='text-xs flex items-center justify-center text-gray-500 font-blod italic'>
                        {page}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <section className='w-full flex items-center justify-center'>
        <Button
          onClick={handleDownload}
          className='mt-2 w-16  bg-[rgb(255,97,47)] cursor-pointer hover:bg-[rgb(255,95,47)] text-white font-medium rounded px-4 py-2 transition-colors'
          disabled={isLoading}
        >
          {t('download')}
        </Button>
      </section>
    </div>
  );
}
