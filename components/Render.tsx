import { useEffect, useRef } from 'react';

interface RenderProps {
  image: string;
  width?: number;
  height?: number;
  rotate?: number;
}

const Render = ({ image, width = 150, height = 220 }: RenderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = width - 12;
    const containerHeight = height - 12;

    // 设置canvas大小
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      // 计算缩放比例，保持原始比例
      const scale = Math.min(
        containerWidth / img.width,
        containerHeight / img.height
      );

      // 计算居中位置
      const x = (containerWidth - img.width * scale) / 2;
      const y = (containerHeight - img.height * scale) / 2;

      // 清除画布
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      // 绘制图片，保持比例
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    };
  }, [image, width, height]);

  return (
    <div
      className='flex justify-center items-center p-[12px] overflow-hidden'
      style={{
        width: `${width - 12}px`,
        height: `${height - 12}px`,
      }}
    >
      <div
        ref={containerRef}
        className='w-full h-full flex justify-center items-center'
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Render;
