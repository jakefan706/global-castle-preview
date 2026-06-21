# Global Castle SEO + CRO 执行方案

## 1. 目标与原则

### 1.1 当前项目的真实目标

对 `Global Castle` 这个站点来说，SEO 和 CRO 不是两套分开的工作。

- `SEO` 负责把高意图买家带进来
- `CRO` 负责让买家在进入站点后更快地产生询盘、索样、目录下载或报价请求

这个站点的业务不是低客单零售，而是典型的 B2B 外贸制造与定制采购，因此优化目标应聚焦在以下 4 个结果：

1. 被欧美采购相关关键词稳定搜到
2. 进入站点后，用户能快速理解“你们做什么、能不能做、适不适合我”
3. 用户能够顺畅发起 `Request a Custom Quote` / `Request a Sample` / `Inquiry`
4. 站内内容具备后续承接 `GEO` 的结构化基础

### 1.2 执行原则

- 不追求“流量虚高”，优先高商业意图关键词
- 不追求“大而全博客”，优先解决采购决策问题
- 不追求页面数量，优先页面质量与转化路径
- 所有 SEO 页面必须服务于询盘转化
- 所有 CRO 优化必须兼顾买家信任建立

---

## 2. 当前站点结构判断

从当前代码结构看，站点已经具备较好的 SEO/CRO 基础页面骨架：

- 首页：`src/app/(frontend)/page.tsx`
- 产品总页：`src/app/(frontend)/products/page.tsx`
- 产品详情页：`src/app/(frontend)/products/[slug]/page.tsx`
- Solutions 总页：`src/app/(frontend)/solutions/page.tsx`
- Solutions 详情页：`src/app/(frontend)/solutions/[slug]/page.tsx`
- Resources 页：`src/app/(frontend)/resources/page.tsx`
- Contact 页：`src/app/(frontend)/contact/page.tsx`
- 全站 metadata：`src/app/(frontend)/layout.tsx`

目前的优点：

- 已有产品、解决方案、资源、联系四大核心入口
- 产品页已有规格、询盘与样品路径
- Solutions 页适合承接高意图服务型关键词
- Resources 页适合承接教育型内容和 GEO 素材沉淀
- Contact 页已有比较完整的询盘信息框架

目前的主要短板：

- metadata 还偏泛，关键词意图层级不够清晰
- 缺少针对采购意图的专题落地页
- 缺少系统化的内容集群
- 产品详情页的 SEO 结构仍偏“产品说明”，未完全转成“采购决策页面”
- CRO 虽已有 CTA，但缺少更强的信任触发器与分层转化设计

---

## 3. SEO 总策略

### 3.1 关键词优先级

这个站点应按 4 层关键词结构来做：

#### A. 核心商业词

目标：获取最直接的 B2B 采购搜索流量

示例：

- `drinkware manufacturer`
- `custom drinkware manufacturer`
- `stainless steel water bottle manufacturer`
- `custom tumbler supplier`
- `OEM ODM drinkware factory`
- `private label drinkware manufacturer`
- `tableware manufacturer China`

#### B. 类目采购词

目标：让产品总页、类目页承接更细分需求

示例：

- `stainless steel bottles wholesale`
- `custom insulated tumbler supplier`
- `ceramic mug manufacturer`
- `gift set drinkware supplier`
- `retail-ready drinkware packaging`

#### C. 解决方案词

目标：让 Solutions 页承接更靠近项目制采购的流量

示例：

- `private label drinkware program`
- `OEM ODM cup development`
- `custom branding on stainless steel bottle`
- `retail packaging for drinkware`
- `drinkware supply chain support`

#### D. 教育与比较词

目标：给 SEO 长尾与 GEO 提供结构化事实内容

示例：

- `stainless steel vs ceramic drinkware`
- `how to source custom water bottles from China`
- `drinkware MOQ planning guide`
- `FDA LFGB drinkware compliance`
- `OEM vs ODM drinkware manufacturing`

### 3.2 页面与关键词映射

#### 首页

目标关键词：

- `B2B drinkware manufacturer`
- `OEM ODM drinkware partner`
- `drinkware supplier for global brands`

首页职责：

- 建立品牌总认知
- 链接至产品、solutions、resources、contact
- 承担品牌词与宽泛商业词的初步承接

#### Products 总页

目标关键词：

- `drinkware catalog`
- `custom drinkware products`
- `professional sourcing drinkware catalog`

职责：

- 承接“产品浏览型”关键词
- 提供类目筛选
- 引导到详情页和询盘页

#### 产品详情页

目标关键词：

- `product name + manufacturer`
- `item number + supplier`
- `custom [product type] factory`

职责：

- 承接 SKU、型号、规格、定制相关词
- 完成“了解产品 -> 发样品请求/报价请求”的转换

#### Solutions 总页与详情页

目标关键词：

- `private label drinkware`
- `OEM ODM drinkware development`
- `retail-ready packaging for drinkware`
- `quality control for export drinkware`

职责：

- 承接项目型和方案型流量
- 让买家理解你们不是单纯卖货，而是提供完整制造支持

#### Resources 页

目标关键词：

- `drinkware sourcing resources`
- `MOQ packaging compliance guide`

职责：

- 沉淀内容资产
- 承接教育型流量
- 为 GEO 提供更容易被引用的知识型内容

#### Contact 页

目标关键词：

- `contact drinkware manufacturer`
- `request custom quote drinkware`

职责：

- 转化终点页
- 服务于高意图买家提交采购 brief

---

## 4. 页面层面的 SEO 优化方案

### 4.1 Metadata 重构

当前 metadata 已有基础，但下一步要做成“按页面意图区分”。

建议标准：

- `title` 控制在 50 到 65 字符左右
- `description` 控制在 140 到 160 字符左右
- 每页只打 1 个主意图 + 1 到 2 个辅助意图

建议优先改造页面：

1. 首页
2. Products 总页
3. Solutions 总页
4. Contact 页
5. Resources 页
6. 产品详情页模板
7. Solutions 详情页模板

建议方向：

- 首页不要只写公司名，要强调 `OEM/ODM + drinkware + tableware + B2B`
- Products 页强调 `catalog + compare specs + quote/customization`
- Solutions 页强调 `private label / branding / OEM ODM / packaging / quality`
- Contact 页强调 `request quote / sampling / sourcing brief`

### 4.2 URL 与信息架构

当前结构已经比较干净，应继续保持：

- `/products`
- `/products/[slug]`
- `/solutions`
- `/solutions/[slug]`
- `/resources`
- `/contact`

建议新增的 SEO 落地页目录：

- `/resources/guides/[slug]`
- `/resources/compliance/[slug]`
- `/resources/materials/[slug]`

如果暂时不想扩目录，也可以先在现有 `Resources` 内容中实现，但中期仍建议单独做内容详情页。

### 4.3 产品详情页 SEO 模板升级

每个产品详情页建议固定包含以下信息块：

1. 产品名称
2. Item number
3. 核心规格
4. 材质
5. 容量
6. MOQ
7. 定制选项
8. 包装选项
9. 适用客户类型
10. 推荐应用场景
11. 常见问题
12. CTA：`Request a Sample` / `Request a Custom Quote`

建议新增的文案模块：

- `Why this product works for private label programs`
- `Customization options`
- `Packaging and retail readiness`
- `Typical buyer use cases`

这样做的意义：

- 对 SEO：增加页面信息密度与关键词覆盖
- 对 CRO：让买家更快判断“是否适合我的项目”

### 4.4 Solutions 页 SEO 模板升级

Solutions 页的价值很大，因为它可以承接“制造服务型关键词”。

每个 solution 详情页建议固定包含：

1. 问题定义
2. 你们的支持范围
3. 具体流程
4. 适合哪些买家
5. 常见 deliverables
6. 风险控制点
7. CTA：开始询盘 / 下载目录 / 请求打样

建议重点强化这些 solution 页面：

- `Technical OEM/ODM Development`
- `Brand Identity & Surface Decoration`
- `Retail-Ready Packaging & Kitting`
- `Quality & Supply Chain Support`

这些页面未来不仅有 SEO 价值，也很适合 GEO 引用。

### 4.5 内链策略

内链不要只为搜索引擎做，要同时服务用户决策。

建议内链规则：

- 首页 -> Products / Solutions / Resources / Contact
- Products 总页 -> 产品详情页
- 产品详情页 -> 对应 Solutions 页面
- 产品详情页 -> Resources 中相关指南
- Solutions 页 -> Contact / Products / Resources
- Resources 页 -> Solutions / Products / Contact

推荐的内容关系：

- 产品页讲“是什么”
- Solutions 页讲“怎么做成项目”
- Resources 页讲“怎么买更专业”
- Contact 页讲“现在就开始”

---

## 5. CRO 总策略

### 5.1 当前 CRO 目标

这个站点的转化不该只定义为“提交表单”。

建议把转化分三层：

#### 一级转化

- `Request a Custom Quote`
- `Start Project Inquiry`
- `Submit inquiry form`

#### 二级转化

- `Request a Sample`
- `Download 2026 Master Catalog`
- `Open product detail`

#### 三级转化

- 停留时间增加
- 查看多个产品页
- 查看 Solutions 页面
- 点击 WhatsApp / Email

### 5.2 关键页面的 CRO 优化重点

#### 首页

首页的目标不是讲完一切，而是让买家迅速做出下一步动作。

首页必须更强地回答：

- 你们到底做什么
- 适合谁
- 有什么制造能力
- 为什么可信
- 下一步怎么联系

建议首页重点强化：

- 主 CTA：`Request a Custom Quote`
- 次 CTA：`View Products` 或 `Request Catalog`
- 认证与工厂能力的可见度
- 简要展示 MOQ、sample、packaging、lead time

#### Products 总页

Products 页买家意图很强，应该缩短决策路径。

建议增加：

- 固定说明：如何筛选 SKU
- 更强的筛选结果说明
- 每张卡片显式展示：
  - material
  - capacity
  - MOQ
  - badge
- hover 状态下的 `Request a Sample` 已经很好，后续可以补：
  - `Quick Specs`
  - `Packaging Ready`

#### 产品详情页

产品详情页应承担最重的 CRO 任务。

建议加入或强化：

- 规格块更靠上
- MOQ、sample、branding、packaging 不要埋太深
- 提供“适合哪类买家”的一句说明
- 提供 `Need custom color/logo/packaging?` 的明确入口
- 表单附近加信任信息：
  - response time
  - export market
  - certifications
  - OEM/ODM experience

#### Contact 页

Contact 页已经是高意图页，优化目标是“减少提交阻力”。

建议：

- 保持表单字段精炼
- 字段顺序按买家思路排列
- 在按钮附近补一句低焦虑说明：
  - `You can start with approximate quantity and target market if specs are not final yet.`
- 对高意图用户提供更快路径：
  - WhatsApp
  - Email
  - Sample request route

### 5.3 信任触发器

对 B2B 外贸站，转化瓶颈常常不是按钮不够大，而是信任不够强。

建议站内高频出现以下信任元素：

- 20 years experience
- FDA / LFGB / food-contact compliance
- OEM/ODM capability
- packaging support
- export documentation support
- factory process visuals
- sampling lead time
- MOQ clarity

建议出现位置：

- 首页
- Products 页
- 产品详情页
- Solutions 页
- Contact 页

### 5.4 CTA 体系标准化

建议以后全站 CTA 只保留少数几种标准动作，避免混乱：

- `Request a Custom Quote`
- `Request a Sample`
- `Download 2026 Master Catalog`
- `View Product Details`
- `Start Project Inquiry`

建议原则：

- 报价型 CTA：面向项目明确用户
- 样品型 CTA：面向产品意向明确用户
- 目录型 CTA：面向尚在比较阶段用户

---

## 6. SEO + CRO 联动内容方案

### 6.1 先做的 8 篇内容

建议第一批内容直接围绕采购场景写，不写空泛品牌文。

#### 采购指南类

1. `How to Source Custom Drinkware for Retail Brands`
2. `OEM vs ODM for Drinkware Projects: Which Model Fits Your Brand`
3. `How to Evaluate MOQ, Sampling, and Packaging Before Placing a Drinkware Order`

#### 合规与质量类

4. `FDA and LFGB Requirements for Drinkware Sourcing`
5. `What Buyers Should Check Before Approving a Drinkware Sample`

#### 材质与产品比较类

6. `Stainless Steel vs Ceramic Drinkware for Private Label Programs`
7. `How to Choose Between Bottles, Tumblers, and Gift Sets for Promotional Programs`

#### 包装与零售类

8. `Retail-Ready Packaging Options for Custom Drinkware Collections`

### 6.2 每篇内容的结构标准

每篇文章建议都包含：

1. 清晰标题
2. 开头先给结论
3. 3 到 5 个核心判断维度
4. 表格或 bullet points
5. 一段 `For buyers working on OEM/ODM programs`
6. 一段 CTA：
   - `Need help evaluating the right product format? Request a custom quote.`

这样可以同时服务：

- SEO：关键词覆盖
- GEO：结构化提取
- CRO：将内容流量导入询盘

---

## 7. 技术 SEO 清单

### 7.1 必做项

1. 完整的 title / description 体系
2. Open Graph 与 Twitter metadata
3. canonical 规范
4. sitemap
5. robots.txt
6. 404 页与 not found 页面可用
7. 图片 alt 文案标准化
8. 结构化数据 schema

### 7.2 Schema 优先级

建议优先做：

- `Organization`
- `WebSite`
- `Product`
- `BreadcrumbList`
- `FAQPage`

对应页面：

- 全站 layout：`Organization` / `WebSite`
- 产品详情页：`Product`
- 产品详情页与 solutions 页：`BreadcrumbList`
- 资源页与产品页常见问题块：`FAQPage`

### 7.3 图片与媒体

SEO 与 CRO 都受图片质量影响。

要求：

- 文件名语义化
- alt 文本不是 `image1`，而是产品与场景描述
- 首屏关键图保证加载快
- 产品 detail 图既有白底图，也有场景图

建议 alt 规范：

- `custom stainless steel insulated bottle with matte finish`
- `retail-ready ceramic mug gift set packaging`
- `laser logo branding on travel tumbler`

---

## 8. 数据追踪与衡量

### 8.1 必须建立的指标

SEO 指标：

- Organic sessions
- Branded vs non-branded traffic
- Top landing pages
- Top converting keywords
- Search Console impressions / clicks / CTR

CRO 指标：

- Contact form submit rate
- Product detail -> inquiry click rate
- `Request a Sample` click rate
- Catalog download click rate
- Solutions page -> contact click rate

### 8.2 关键页面目标

首页：

- 首页到产品页点击率
- 首页到 contact 点击率

Products 页：

- 产品卡片详情点击率
- `Request a Sample` 点击率

产品详情页：

- CTA 点击率
- 表单启动率

Contact 页：

- 表单完成率
- 放弃率

---

## 9. 30 / 60 / 90 天执行计划

### 9.1 前 30 天

目标：把 SEO 与 CRO 基础盘搭起来

执行项：

1. 重构首页、products、solutions、contact、resources metadata
2. 重构产品详情页的内容模块顺序
3. 为产品详情页补充 FAQ、use cases、packaging、customization 说明
4. 统一 CTA 文案和位置
5. 增加基础 schema
6. 发布首批 3 篇采购指南内容
7. 建立 Search Console / GA4 / 转化追踪

### 9.2 31 到 60 天

目标：建立内容集群和更明确的方案页流量入口

执行项：

1. 发布剩余 5 篇内容
2. 强化 Solutions 页与产品页之间的内链
3. 新增 2 到 4 个高意图专题页
4. 优化 Contact 页字段与信任触发器
5. 优化 catalog download 路径

### 9.3 61 到 90 天

目标：开始放大自然流量并提升询盘质量

执行项：

1. 根据 Search Console 数据修正关键词布局
2. 对高流量低转化页面做 CRO 迭代
3. 增加 2 到 3 个高质量工厂/测试视频并嵌入站内
4. 准备 LinkedIn 基础内容节奏
5. 为 GEO 准备更强的结构化内容页

---

## 10. 当前最值得先做的改动清单

如果只做最关键的一批，我建议按以下顺序执行：

1. 首页 metadata + hero 文案再对齐核心关键词
2. Products 页 metadata 与导语再强化采购意图
3. 产品详情页模板加入 FAQ / packaging / use cases / trust points
4. Solutions 页每个模块补“适合谁、交付什么、下一步怎么联系”
5. Contact 页增加低焦虑说明与更强信任信息
6. Resources 页开始承接采购指南内容
7. 布置 Search Console、GA4、转化追踪

---

## 11. 给项目的结论

对这个站点来说，真正有效的路线不是“先做 SEO，之后再看 CRO”，而是：

`高意图 SEO 页面 -> 更强的信任表达 -> 更短的询盘路径 -> 数据回看 -> 持续迭代`

也就是说：

- `SEO` 决定有没有对的人来
- `CRO` 决定这些人会不会联系你
- `GEO` 会建立在高质量 SEO 内容之上
- `VEO / SMO` 是放大信任和品牌可信度的增量手段

现阶段最优策略：

1. 先把 SEO 和 CRO 做扎实
2. 再把 GEO 内容结构顺手一起埋进去
3. 然后再扩到 VEO 与 LinkedIn 等外部触点

---

## 12. 后续建议文档

建议后续再补两份执行文档：

1. `GEO执行方案.md`
2. `内容选题与关键词地图.md`

这样你后面推进时会更顺：

- 这份文档负责总策略
- `GEO执行方案` 负责 AI 搜索适配
- `内容选题与关键词地图` 负责实际写作排期

