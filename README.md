# 项目名称 (pdf旋转工具)

(请在此处添加您的项目简介，如果还没有的话)

## 技术栈

本项目主要使用以下技术构建：

*   **核心框架**: [Next.js](https://nextjs.org/) (v15.3.2)
*   **编程语言**: [TypeScript](https://www.typescriptlang.org/)
*   **UI 与样式**:
    *   [React](https://react.dev/) (v19.0.0)
    *   [Tailwind CSS](https://tailwindcss.com/) (v4)
    *   [Radix UI](https://www.radix-ui.com/) (用于无障碍 UI 组件)
    *   [Lucide React](https://lucide.dev/) (图标库)
*   **包管理器**: [pnpm](https://pnpm.io/)
*   **开发与构建**: [Turbopack](https://turbo.build/pack) (用于 Next.js 开发模式)
*   **国际化 (i18n)**: [next-intl](https://next-intl-docs.vercel.app/)
*   **SEO**: [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
*   **代码规范**: [ESLint](https://eslint.org/)
*   **PDF 处理**:[react-pdf](https://react-pdf.org/) [pdf-lib](https://pdf-lib.js.org/)


### 运行开发服务器

要启动本地开发服务器，请运行以下命令：

#### 安装依赖
```bash
pnpm install
```

#### 启动项目
```bash
pnpm dev
 ```

 ## SEO优化
为了提升网站在搜索引擎中的可见性，本项目采取了以下 SEO 优化措施：

1.  **站点地图 (Sitemap)**:
    *   通过 `next-sitemap` 包自动生成 `sitemap.xml`。
    *   站点地图包含了网站的主要可索引页面，并会根据 `next-sitemap.config.js` 中的配置（例如 `changefreq`, `priority`）为搜索引擎提供更新频率和重要性提示。
    *   生产构建时（例如执行 `pnpm build` 后，通常会包含生成站点地图的步骤，具体请参考 `package.json` 中的 `build` 和 `sitemap` 脚本）。

2.  **Robots.txt**:
    *   自动生成 `robots.txt` 文件，用于指导搜索引擎爬虫如何抓取网站内容。
    *   `robots.txt` 文件会指向 `sitemap.xml` 的位置。
    *   根据 `next-sitemap.config.js` 中的配置，排除了不希望被搜索引擎索引的路径 (例如 `/admin*` 页面)。

3.  **元数据 (Metadata)**:
    *   Next.js (App Router) 提供了强大的元数据管理功能。您可以在 `layout.tsx` 或 `page.tsx` 文件中为每个页面或布局定义静态或动态的 `title`, `description` 等重要的 SEO 标签。
    *   良好的元数据有助于搜索引擎理解页面内容，并在搜索结果中以更吸引人的方式展示您的网站。

4.  **国际化 (i18n)**:
    *   项目集成了 `next-intl`（根据项目结构推断），支持多语言内容。这有助于针对不同语言和地区的用户进行 SEO 优化，使相应语言的搜索结果能更好地展示您的网站。
    *   为不同语言版本提供独立的 URL 通常是推荐的做法，`next-intl` 有助于实现这一点。
