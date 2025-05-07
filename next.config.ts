import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

// 生产环境打包优化
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // 防止重定向
  async rewrites() {
    return [
      {
        source: '/pdf.worker.min.mjs',
        destination: '/pdf.worker.min.mjs',
      },
    ];
  },
  // 自定义webpack配置
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 优化模块ID生成方式
      config.optimization.moduleIds = 'deterministic';

      // 增强代码拆分配置
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 240000, // 降低最大块大小以更好地分割代码
      };
    }
    return config;
  },

  // 生产环境移除 console
  compiler: {
    removeConsole: isProd,
  },

  // 实验性功能
  experimental: {
    // 开启 Next.js 的实验性优化特性
    optimizeCss: true, // 优化 CSS
    scrollRestoration: true, // 滚动位置恢复
    reactCompiler: true,
    // 使用 lightningcss 优化 CSS
    mdxRs: true, // 使用 Rust 编译 MDX
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: isProd
              ? 'public, max-age=31536000, immutable' // 生产环境使用更积极的缓存策略
              : 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
