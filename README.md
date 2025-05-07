# 项目名称 (pdf旋转工具)

### 运行开发服务器

要启动本地开发服务器，请运行以下命令：

#### 安装依赖

```bash
pnpm i
```
#### 启动项目

```bash
pnpm dev
```

此命令将使用 Turbopack 在 `http://localhost:8888` 上启动开发服务器。当您修改项目文件时，应用会自动重新加载。

## 其他信息


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

