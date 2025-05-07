'use client';
import { Download, RotateCcw, RotateCw, Trash2, Upload } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// 配置worker

export default function RotatePDF() {
  const [isDragging, setIsDragging] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '../public/pdf.worker.min.js';
  }, []);
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
      setPageRotations({});
      setCurrentPage(1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type === 'application/pdf') {
      setPdfFile(files[0]);
      setPageRotations({});
      setCurrentPage(1);
    }
  };

  const handleRotate = (direction: 'clockwise' | 'counterclockwise') => {
    setPageRotations((prev) => {
      const currentRotation = prev[currentPage] || 0;
      const newRotation =
        direction === 'clockwise'
          ? (currentRotation + 90) % 360
          : (currentRotation - 90 + 360) % 360;

      return {
        ...prev,
        [currentPage]: newRotation,
      };
    });
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const applyRotations = async () => {
    if (!pdfFile) return null;

    setIsProcessing(true);
    try {
      // 读取PDF文件
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // 应用旋转
      const pages = pdfDoc.getPages();

      Object.entries(pageRotations).forEach(([pageIndex, rotation]) => {
        const index = parseInt(pageIndex) - 1;
        if (index >= 0 && index < pages.length) {
          // PDF-lib使用不同的旋转表示方式
          pages[index].setRotation(degrees(rotation));
        }
      });

      // 保存PDF
      const modifiedPdfBytes = await pdfDoc.save();
      return new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    } catch (error) {
      console.error('Error applying rotations:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    const modifiedPdf = await applyRotations();
    if (!modifiedPdf) return;

    const url = URL.createObjectURL(modifiedPdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rotated-${pdfFile?.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setPdfFile(null);
    setPageRotations({});
    setCurrentPage(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const changePage = (offset: number) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + offset;
      return newPage > 0 && newPage <= numPages ? newPage : prevPage;
    });
  };

  if (!pdfFile) {
    return (
      <div
        className={`border-2 border-dashed rounded-md p-10 w-full max-w-lg h-[400px] flex flex-col items-center justify-center cursor-pointer bg-white ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className='flex flex-col items-center justify-center'>
          <div className='mb-4 text-gray-500'>
            <Upload size={48} />
          </div>
          <p className='text-base text-center'>单击上传或拖放</p>
        </div>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='.pdf'
          className='hidden'
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center p-4 min-h-[calc(100vh-64px)] bg-amber-50'>
      <h1 className='text-2xl font-bold mb-4'>旋转 PDF 页面</h1>

      <div className='bg-white rounded-lg shadow-md p-4 w-full max-w-3xl'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center space-x-2'>
            <button
              className='p-2 rounded-full hover:bg-gray-100'
              onClick={clearFile}
              title='删除文件'
            >
              <Trash2 className='w-5 h-5 text-gray-600' />
            </button>
            <span className='text-sm truncate max-w-[200px]'>
              {pdfFile.name}
            </span>
          </div>
          <button
            className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition'
            onClick={handleDownload}
            disabled={isProcessing}
          >
            <Download className='w-4 h-4' />
            <span>下载</span>
          </button>
        </div>

        <div className='flex justify-center mb-4'>
          <div className='border rounded-md p-2 relative'>
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className='p-20 text-center'>加载中...</div>}
              error={
                <div className='p-20 text-center text-red-500'>无法加载PDF</div>
              }
            >
              <Page
                pageNumber={currentPage}
                width={500}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                rotate={pageRotations[currentPage] || 0}
              />
            </Document>
          </div>
        </div>

        <div className='flex justify-center space-x-4 mb-4'>
          <button
            className='p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition'
            onClick={() => handleRotate('counterclockwise')}
            title='逆时针旋转'
          >
            <RotateCcw className='w-6 h-6' />
          </button>
          <button
            className='p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition'
            onClick={() => handleRotate('clockwise')}
            title='顺时针旋转'
          >
            <RotateCw className='w-6 h-6' />
          </button>
        </div>

        <div className='flex justify-between items-center'>
          <button
            className='px-4 py-2 border rounded-md disabled:opacity-50'
            onClick={() => changePage(-1)}
            disabled={currentPage <= 1}
          >
            上一页
          </button>
          <span>
            {currentPage} / {numPages}
          </span>
          <button
            className='px-4 py-2 border rounded-md disabled:opacity-50'
            onClick={() => changePage(1)}
            disabled={currentPage >= numPages}
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
