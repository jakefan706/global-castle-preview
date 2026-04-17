# 交接摘要 — Global Castle B2B 网站项目

> 更新日期：2026-04-10
> 上一位 Agent 完成进度：Step D（全局组件）+ Step E（种子数据），准备进入 Step F

---

## 1. 当前任务目标

为 Global Castle Industrial Co., Ltd.（杭州杯壶出口贸易公司）搭建 B2B 产品展示网站，定位为**能力展示为主、产品展示辅助**。

**技术栈**：Next.js（App Router）+ Payload CMS v3 + PostgreSQL 16 + Tailwind CSS v4
**部署目标**：Docker Compose 运行在 Hetzner VPS（尚未购买）

---

## 2. 当前进展

### Step A — 环境检查（✅ 完成）
- Node.js 22.x、pnpm 10.32.1、Docker Desktop 均已就绪

### Step B — 项目初始化（✅ 完成）
- 项目目录：`/Users/abcd/Vibecoding/website/global-castle/`
- Next.js 16.2.2 + Payload CMS v3.81.0 手动安装（`create-payload-app` 在无 TTY 环境失败，改为手动安装）
- PostgreSQL 16 运行在 Docker 容器 `global-castle-db`（端口 5432）
- 开发服务器：`pnpm dev`，访问 `http://localhost:3000`
- 数据库容器状态：`docker ps | grep global-castle-db` 确认在运行

### Step C — Payload Collections（✅ 完成）
- 9 个 Collections 全部配置完成
- 管理后台 `http://localhost:3000/admin` 验证可用
- 管理员账号：`sales@cnurbaneco.com` / `Si287100`

### Step D — 全局组件（✅ 完成）
- `src/app/(frontend)/components/Header.tsx` — 响应式导航，透明→sticky 过渡，Products 下拉，移动端侧边栏
- `src/app/(frontend)/components/Footer.tsx` — 4 列布局，社交图标 box-shadow inset hover 效果
- `src/app/(frontend)/components/WhatsAppButton.tsx` — 右下角浮动，1.5s 延迟 scale-in 出现
- 已接入 `src/app/(frontend)/layout.tsx`（Header + main + Footer + WhatsAppButton）
- 首页临时占位已更新：`src/app/(frontend)/page.tsx`

### Step E — 种子数据（✅ 完成，通过 REST API 写入）
- Categories：11 条 ✓
- CapacityRanges：7 条 ✓
- Applications：10 条 ✓
- Products：未写入（需先上传图片）

### 动画设计规范（✅ 已定义）
- 文件：`/Users/abcd/Vibecoding/website/动画设计规范.md`
- 自定义 keyframes 已在 `globals.css` 中定义（fade-in, fade-up, fade-in-left, fade-in-right, scale-in）
- `.reveal` / `.reveal-fade` / `.reveal-left` / `.reveal-right` CSS class 已就绪
- 按钮样式 `.btn-primary` / `.btn-secondary` / `.btn-white` / `.link-underline` / `.social-icon` 已定义

---

## 3. 关键上下文

### 重要背景信息
- 公司定位：外贸 B2B，面向欧美礼品商、批发商、咖啡连锁店、品牌商
- 产品：不锈钢保温杯、铝瓶、塑料杯、陶瓷杯、玻璃杯等
- 现有网站：https://www.cnurbaneco.com/（设计过时，需全新改版）
- 网站定位变化（2026-04-10）：从"产品目录+筛选"改为**"能力展示为主、产品展示辅助"**

### 关键决定（已确认，不可更改）
1. **去掉产品筛选功能** — 不做大而全的产品目录，每个分类只展示 10-15 款精选/热门产品
2. **去掉 Hero 视频** — 改为静态大图 Banner（桌面 1920×1080 ≤400KB + 移动 768×1024 ≤200KB）
3. **移除 CapacityRanges Collection** — 用户手动从 `项目执行计划书-0418.md` 中删除了 5.3 CapacityRanges 的定义，后续产品列表页不再使用容量筛选
4. **Solutions 是静态页面** — 不创建 CMS Collection，代码写死
5. **爬虫数据不用** — `products_data/` 质量差，全部手动录入
6. **v0.dev 做 UI → 确认风格 → 我来集成** 的工作流

### 设计规范

| 用途 | 值 |
|------|-----|
| 主色 | `#67c0bf`（Tiffany Blue） |
| 辅助色 | `#4A90D9`（浅蓝） |
| 点缀色 | `#2ECC71`（环保绿） |
| 背景 | `#FFFFFF` / `#F5F7FA` |
| 字体 | **Nunito Sans**（Google Fonts），variable `--font-nunito-sans` |
| 断点 | 桌面 ≥992px，平板 768-991px，手机 <768px |

### 页面结构（7 个路由）
```
/                    → 首页（Hero Banner + 优势 + 分类入口 + 数据 + 信任 + 询盘）
/products            → 产品列表（分类 Tab + 精选产品网格，无筛选，无分页）
/products/[slug]     → 产品详情（叙事式布局，需 v0.dev 设计）
/solutions           → 定制方案（静态页面）
/resources           → 资源中心（Catalog Downloads + Certifications）
/blog                → 博客列表
/blog/[slug]         → 博客详情
/about               → 关于我们
/contact             → 联系我们（询盘表单）
```

---

## 4. 关键发现

### 已解决的技术坑点
| 问题 | 解决方案 |
|------|----------|
| `create-payload-app` TTY 错误 | 改为 `create-next-app` + 手动安装 Payload |
| `@payloadcms/next` 无主导出 | 改为从 `@payloadcms/next/withPayload` 导入 |
| `<html>` 嵌套冲突 | 根 layout.tsx 只 return children，前台布局放 `(frontend)/` 下 |
| `handleServerFunctions` 传参问题 | 独立 `serverFunction.ts`，顶部加 `'use server'` |
| Payload `getPayload()` 在 tsx 脚本中不可用 | 改用 REST API + admin token 操作数据 |
| 管理后台超宽屏过散 | 注入 `admin-custom.css`，限制 body max-width: 1600px 居中 |

### 已写入的种子数据（ID 自增，从 1 开始）
- Categories：11 条，ID 1-11（Stainless Steel Bottles → Custom Drinkware）
- CapacityRanges：7 条，ID 1-7
- Applications：10 条，ID 1-10

### Products Collection 字段
- name, slug, itemNumber, description(RichText), mainImage→Media, gallery[], category→Categories, capacityRange→CapacityRanges, applications→Applications(hasMany), material(select), priceRange(select), specifications(RichText), featured, newArrival

---

## 5. 未完成事项（按优先级排序）

### 高优先级
1. **Step F — 产品列表页 `/products`**
   - 分类 Tab 导航（11 个分类横排，点击切换）
   - 当前分类简介文字
   - 产品网格（每分类精选 10-15 款，4/3/2 列响应式）
   - 底部 CTA："Have a specific product in mind? Contact us for the full catalog."
   - **无筛选功能、无分页、无滚动揭示动画**（产品少）

2. **Step G — 产品详情页 `/products/[slug]`**
   - 需等 v0.dev UI 设计确认后再实现
   - 参考 rticoutdoors.com 叙事式布局
   - 已准备好 v0.dev 提示词（在聊天记录中）

3. **Step H — 首页 `/`**
   - 需等 Hero Banner 图片素材就位
   - 需等 v0.dev 首页 UI 设计确认

### 中优先级
4. Solutions 静态页面
5. About Us 页面
6. Contact 页面 + 询盘系统
7. Blog 列表 + 详情
8. Resources 页面
9. SEO 优化（sitemap、Schema.org、meta）

### 低优先级
10. Docker 部署配置
11. VPS 购买与上线
12. 图片素材整理与上传

---

## 6. 建议接手路径

### 应先查看的文件
1. `/Users/abcd/Vibecoding/website/global-castle/docs/项目执行计划书-0418.md` — 完整项目计划，最新改动都在这里
2. `/Users/abcd/Vibecoding/website/动画设计规范.md` — 动画系统规范
3. `/Users/abcd/Vibecoding/website/global-castle/src/payload.config.ts` — Payload 配置
4. `/Users/abcd/Vibecoding/website/global-castle/src/app/globals.css` — 设计系统（颜色、keyframes、按钮、链接、social-icon class）
5. `/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/layout.tsx` — 前台根布局
6. `/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/components/` — 已有 Header、Footer、WhatsAppButton

### 应先验证
```bash
cd /Users/abcd/Vibecoding/website/global-castle
docker ps | grep global-castle-db    # 确认 DB 容器
pnpm dev                             # 启动开发服务器
# 访问 http://localhost:3000 确认页面正常
# 访问 http://localhost:3000/admin 确认后台可登录
```

### 推荐立即开始：Step F 产品列表页
- **不需要** v0.dev 设计稿，结构清晰，可以直接编码
- 创建 `src/app/(frontend)/products/page.tsx`
- 服务端从 Payload API 拉取 products + categories
- 客户端状态：当前选中的分类 tab
- 网格卡片复用 `globals.css` 中已有的 `.btn-secondary` 样式
- 分类切换时重新请求 `api/products?where[category][equals]=${id}&depth=1`

---

## 7. 风险与注意事项

### 已知陷阱
1. **不要用 `getPayload()` 在 tsx 脚本中操作数据** — Payload 的 `loadEnv` 依赖 Next.js 环境，直接用 REST API
2. **CapacityRanges 已被用户手动删除** — 不要再创建/使用此 Collection
3. **产品列表页不做筛选** — 这是 2026-04-10 的最新决策，不要按老方案实现
4. **产品卡片不做滚动揭示动画** — 产品少（10-15 款），不需要
5. **Hero 视频已去掉** — 改为静态 Banner 图，不要再实现 `<video>` 方案
6. **管理后台已限制 max-width 1600px** — 如果后续用户说太窄/太宽，可调

### 已经验证过的（不建议再试）
- `create-payload-app` 交互式 CLI 在 Claude Code 中不可用
- `pnpm create payload-app` 无 TTY 报错
- Payload seed 脚本用 `getPayload()` 不可行
- 根 layout.tsx 必须只 return children，不能嵌套 `<html>`

---

**下一位 Agent 的第一步建议：**

1. 进入 `global-castle/` 目录，运行 `docker ps | grep global-castle-db` 确认数据库，然后 `pnpm dev` 启动开发服务器
2. 浏览 `http://localhost:3000` 确认现有 Header/Footer/WhatsAppButton 正常工作
3. 进入 `http://localhost:3000/admin`（账号：`sales@cnurbaneco.com` / `Si287100`）确认 Collections 和种子数据
4. **立即开始 Step F — 产品列表页**：
   - 新建 `src/app/(frontend)/products/page.tsx`
   - 服务端 fetch `api/categories` 获取分类列表和 `api/products?depth=1` 获取产品数据
   - 客户端实现：分类 Tab 切换 → 过滤当前分类产品 → 渲染网格卡片
   - 分类 Tab 从导航栏 `?category=xxx` URL 参数进入时自动选中对应分类
   - 产品卡片：图片 + 名称 + 型号 + 材质标签 + "View Details →" 按钮
   - 底部加询盘 CTA 横幅
5. 同时提醒用户：可以开始用 v0.dev 做**产品详情页**的 UI 原型了（提示词在聊天记录中）
