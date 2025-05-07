/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // TODO: 替换成你的实际网站URL
  siteUrl: 'https://design.ljhboard.cn',
  generateRobotsTxt: true,
  exclude: [
    '/admin*', // 排除所有管理员相关页面
    '/adminlogin*', // 排除管理员登录页面
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        // TODO: 替换成你的实际网站URL
        sitemap: 'https://design.ljhboard.cn/sitemap.xml',
      },
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
};
