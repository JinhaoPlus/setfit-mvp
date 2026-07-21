# SetFit MVP：项目约定与维护指南

本文件适用于整个 `setfit-mvp` 目录。后续代理或开发者修改本项目时，应先阅读本文件，再检查与任务直接相关的源码。

## 1. 项目目标与当前状态

SetFit 是一个面向搜索流量和展示空间规划的独立 LEGO 套装尺寸网站。核心用户问题是：

- 一个已拼装套装实际有多高、多宽、多深；
- 它是否能放进用户给定内部尺寸的书架或展示柜；
- 包装尺寸和成品模型尺寸有什么区别；
- 数据不是官方完整 H/W/D 时，用户应如何理解和预留空间。

当前是本地 MVP，默认地址为 `http://localhost:3000`。除非用户明确要求，不要部署、发布、购买服务或接入生产数据库。

当前发布语言是英语、德语和简体中文，但架构必须继续允许独立添加日语、繁体中文及其他语言。每个语言版本只能显示自己的界面文案；英文和德文页面不应泄露中文，中文页面也不应回退为英文界面文案。语言切换器中的原生语言名，以及套装名称、主题、品牌名和外部来源名可以保留原文。

## 2. 不可破坏的产品约束

### 尺寸呈现

- 页面主尺寸使用 `corrected_height_cm`、`corrected_width_cm`、`corrected_depth_cm`，顺序固定为 Height × Width × Depth。
- 只有三个轴均为正数时，才视为拥有可用于展示规划的完整尺寸。
- `package_*` 是零售包装数据，必须和拼装模型尺寸严格分开，绝不能用包装尺寸补成模型尺寸。
- 多模型、多个独立模块、散件包等没有一个有意义固定外包络的产品，应显示“没有单一固定尺寸”，不要强行计算，也不要进入适配计算器。
- 不要在普通卡片或主尺寸旁突出显示 A/B 等级、置信度或内部核验术语。必要的来源方法和可靠性提示放在小型 `InfoTip` 中，以平实文案说明。
- 不要把估算尺寸写成“官方尺寸”。`correction_method` 和 `correction_confidence` 的含义必须保留。

### 前台文案

- 不要在前台刻意宣传“Top 500”“500 个套装”或其他固定数据量。数据集以后会变化。
- 不要在前台强调或显示 `snapshot (2026-07-19)`、抓取日期或类似快照日期。日期可以留作内部溯源元数据。
- 不要重新添加 Brickset API field documentation 链接。详情页需要的公开链接是具体 Brickset 套装页和模型尺寸来源页。
- 套装详情页的 H1 只显示套装名称，页面 title 只使用套装名称和编号；不要在名称后再拼接 `dimensions`、`Maße`、`尺寸` 等通用后缀。
- 套装详情页不展示 Brickset 拥有者数量。`owned` 只可继续用于资料库的内部排序选项，除非用户另行要求。
- 适配计算器必须明确表达“所选套装能否放进柜子”，而不是模糊地问“能否适配”。当前标题固定为英文 `Will this set fit in your cabinet?`、德文 `Passt dieses Set in deinen Schrank?`、简体中文“柜子是否能装得下”。输入值是柜子或书架的可用内部净尺寸，不是家具外部尺寸。
- 顶栏提供唯一的 CM/IN 单位切换，计算器内部不要再放重复的单位控件。英语版本当前按 `en-US` 使用者设计，首次访问默认 IN；德语和简体中文首次访问默认 CM。用户手动选择后，以浏览器保存的偏好为准并跨页面、跨语言继续使用。
- 计算器需要把用户输入的内部净宽、净深、净高和所选单位保存在当前浏览器的 `localStorage`，刷新、切换套装或切换语言后都应恢复。尺寸以厘米作为内部标准值存储，英寸只用于输入输出换算。存储不可用、内容损坏或被用户修改时必须安全回退到当前语言的默认值，不能让计算器报错。
- LEGO® 商标免责声明和 Brickset 图片署名必须保留。SetFit 不得表现为 LEGO Group 或 Brickset 的官方产品。
- 面向用户的文案必须来自语言字典，不要在组件内散落英语、德语、中文或未来语言的硬编码句子。套装名称、主题和外部来源名称等数据值除外。

### 国际化与 SEO

- 每个发布语言使用可索引的路径前缀，例如 `/en/...`、`/de/...`、`/zh/...`。
- 语言切换器要保留当前页面，只替换 locale 路径段，并显示对应 emoji 国旗。
- 每个 locale 必须有独立维护的完整文案和 SEO metadata，不能依赖运行时机器翻译。
- 新增语言时，canonical、`hreflang`、`x-default`、`<html lang>`、静态参数和 sitemap 必须同步生效。
- 无语言前缀的旧路径继续重定向到默认英语版本。
- 生产环境必须设置正确的 `NEXT_PUBLIC_SITE_URL`，否则 robots/sitemap 会回退到 `http://localhost:3000`。

## 3. 技术栈与运行方式

- Next.js App Router 16、React 19、TypeScript。
- 使用 vinext/Vite 构建 Cloudflare Worker 兼容产物。
- Node.js 要求 `>=22.13.0`。
- 样式集中在 `app/globals.css`。
- 当前没有业务数据库、账户、用户提交或广告 Cookie。配置 `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` 后可启用 PostHog 产品分析，但 SDK 默认拒绝采集且不持久化分析标识，只有用户明确同意后才采集页面访问和基础交互；会话录屏、异常、热图和性能采集保持关闭。计算器仅使用浏览器本地存储保存柜架尺寸和所选单位，不会发送到服务器。

常用命令：

```bash
npm install
npm run dev
npx tsc --noEmit
npm run lint
npm test
```

`npm test` 会先完成生产构建，再运行服务端渲染 HTML 测试。不要只以开发服务器能打开作为完成标准。

如果浏览器中的 `localhost:3000` 和源码或构建结果不一致，现有开发进程可能已经陈旧。先确认进程状态，必要时安全地重启 `npm run dev`，再重新验证页面；不要用旧页面状态判断补丁无效。

## 4. 数据来源与运行时数据流

### 当前真正被网站读取的数据

运行时唯一的套装主数据文件是：

- `data/large-top500.json`

文件名中的 `top500` 是内部历史命名，不是前台品牌或永久数据量承诺。代码应根据数组实际长度计算统计值，不要硬编码 500。

数据转换入口是 `data/sets.ts`：

1. 静态导入 `large-top500.json`；
2. 为每个套装生成稳定 slug：`{set_number}-{name}-dimensions`；
3. 设置本地图片可用状态；
4. 生成 `displaySets`、`planningSets` 和计算器选项；
5. 根据数组内容动态计算 library stats；
6. 提供单套装查询、外包络体积和建议空间等函数。

网站启动和浏览页面时不会实时请求 Brickset、LEGO API 或其他线上数据库。外部 URL 仅用于署名和来源跳转。

### 数据依据文件

- `data/sources/LEGO_大型套装Top500_尺寸与收纳报告.md`：人类可读核验报告；
- `data/sources/LEGO_大型套装尺寸与收纳数据规范.md`：字段、订正、证据和计算规范；
- `data/sources/LEGO_大型套装Top100_尺寸核验报告.md` 与 `data/large-top100.json`：早期版本，仅供历史参考，不是当前运行时数据源。

修改数据时，应优先保证 JSON 与 Top500 报告、数据规范一致。不要根据页面展示反向覆盖经过核验的原始字段。

### 字段分层

- `model_dim_*`、`model_small/medium/large_*`：原始或标准化模型尺寸信息；
- `verified_*`：核验所得有方向尺寸；
- `corrected_*`：网站最终用于 H/W/D 展示和计算的尺寸；
- `package_*`：包装尺寸、重量和体积；
- `correction_method`：`official`、`direct`、`inferred`、`estimated` 或 `not_applicable`；
- `correction_confidence`：内部可靠性信息，用于悬浮信息文案，不应成为主视觉标签；
- `retrieved_at`、`brickset_last_updated`：内部溯源字段，不要在前台强调；
- `brickset_url`、`model_source_url`：用户可访问的来源链接。

原始 JSON 的 `model_note`、`verified_configuration`、`correction_note` 中含有中文内部说明。`data/sets.ts` 当前在生成 `displaySets` 时将这些字段清空，防止内部核验文案被当作面向用户的中文内容直接输出，也防止它泄露到英文或德文页面。若未来要展示这些信息，必须先为每种语言建立可维护的翻译层，不能直接输出原值。

### 当前计算规则

- 完整规划尺寸：三个 `corrected_*` 字段均非 null 且大于 0；
- 模型矩形外包络体积：`H × W × D / 1000`，单位为升；
- 建议起始展示空间：每个轴在模型尺寸上增加 `siteConfig.displayClearanceCm`，当前为 5 cm；
- 普通适配：柜内宽 ≥ 模型宽、柜内深 ≥ 模型深、柜内高 ≥ 模型高；
- 旋转适配：宽和深交换后再次比较，高度不变；
- “有余量”判断：三个轴还要分别满足配置的展示余量；
- 这是矩形无悬空初筛，不包括门框、铰链、踢脚线、可动结构、天线、帆、灯线或不同展示姿态。

相关实现：

- `data/sets.ts`：数据整理、统计、体积、建议空间；
- `data/set-presentation.ts`：完整尺寸判断、图片路径、数值格式、信息提示文案；
- `components/ShelfFitCalculator.tsx`：cm/in 换算、正常/旋转方向适配；
- `views/SetDetailPage.tsx`：详情页展示和 metadata。

## 5. 图片

- 套装图片位于 `public/sets/{set_id}.jpg`，例如 `public/sets/10294-1.jpg`。
- 图片来自 Brickset，当前采取本地文件而不是页面运行时热链。
- `data/set-presentation.ts` 负责生成图片路径。
- `data/sets.ts` 中维护缺图 set ID；缺图时必须显示明确占位符，不要产生破图。
- 列表和详情图片的 alt 文本需要包含套装名和套装编号，并从当前 locale 获取通用“Set”词汇。
- 如果更新数据集，应同时核对图片文件与缺图列表，而不是假定每条数据都有图片。

## 6. 国际化配置位置

- `config/site.ts`
  - locale 注册表；
  - 默认语言；
  - emoji 国旗；
  - 数字区域格式、Open Graph locale、轴标签和默认单位；
  - locale 路径、canonical 和 `hreflang` 辅助函数；
  - 分页大小、展示余量和示例家具尺寸。
- `data/i18n.ts`
  - 每个语言独立的完整 UI、页面、SEO、提示和隐私文案；
  - `getDictionary(locale)` 是统一读取入口。
- `components/LanguageSwitcher.tsx`
  - 保留当前 pathname 的语言切换；
  - 写入语言 Cookie；
  - 选项显示 emoji 国旗和语言名称。
- `components/MeasurementUnitSwitcher.tsx`
  - 顶栏唯一的 CM/IN 控件；
  - 使用当前 locale 的默认单位，并允许浏览器保存的用户偏好覆盖默认值；
  - 单位切换必须作用于全站所有可见长度，包括首页卡片与对比、套装详情、包装与建议预留空间、指南表格和适配计算器，不能只改变计算器。
- `components/MeasurementProvider.tsx` 与 `components/LocalizedMeasurement.tsx`
  - 为全站可见长度提供同一个浏览器单位状态和本地化格式；
  - SEO metadata 和服务端描述使用语言版本的默认单位，浏览器保存的偏好仅覆盖交互页面上的显示，避免 metadata 因个人浏览器状态而不稳定。
- `components/measurement-preferences.ts`
  - 柜架尺寸和单位的共享浏览器状态；
  - 负责校验、localStorage 保存、跨页面恢复和存储异常回退。

添加新语言时至少完成：

1. 在 `siteConfig.locales` 注册语言代码、原生语言名和旗帜；
2. 在 `localeSettings` 添加数字格式、Open Graph locale、轴标签和默认单位；
3. 在 `data/i18n.ts` 增加与现有字典结构完全一致的内容块；
4. 执行 TypeScript、lint、构建和渲染测试；
5. 检查新语言页面的 `<html lang>`、canonical、`hreflang`、sitemap、切换器和同页跳转；
6. 检查所有可见字符串，确保没有回退成不相关语言。

不要在组件中写 `if (locale === "de")` 之类的语言分支来放文案；应该扩展字典或 locale settings。

## 7. 页面与组件结构

主要路由：

- `app/[locale]/page.tsx`：首页；
- `app/[locale]/sets/page.tsx`：套装库；
- `app/[locale]/sets/[slug]/page.tsx`：套装详情；
- `app/[locale]/methodology/page.tsx`：方法说明；
- `app/[locale]/guides/...`：SEO 指南页；
- `app/[locale]/privacy/page.tsx`：隐私页；
- `app/sitemap.ts`、`app/robots.ts`：搜索引擎入口；
- `next.config.ts`：无 locale 路径重定向。

可复用结构：

- `views/*Page.tsx`：页面主体；
- `components/SiteHeader.tsx`、`SiteFooter.tsx`：全站框架；
- `components/SetCard.tsx`：套装卡片；
- `components/SetLibrary.tsx`：搜索、筛选、排序和渐进加载；
- `components/ShelfFitCalculator.tsx`：尺寸适配计算器；
- `components/InfoTip.tsx`：低干扰来源/可靠性提示。

套装库首屏服务端输出 `siteConfig.libraryPageSize` 条记录，当前为 24。后续通过 IntersectionObserver 自动加载，也保留“Load more”按钮。筛选或排序变化时要重置可见数量。不要一次在首屏渲染整个库，否则会损害性能和可用性。

## 8. SEO 约定

- locale layout 输出正确 `<html lang>` 和语言化默认 metadata；
- 每个静态页面和套装详情页都应有语言化 title/description；
- 详情页 title、description、Open Graph 图片来自套装实际数据；
- `localizedAlternates()` 统一生成 canonical、语言 alternate 和 `x-default`；
- `app/sitemap.ts` 从 locale 注册表和 `displaySets` 动态生成 URL，不能维护手写套装清单；
- slug 当前基于套装号与英文套装名生成。新增语言时保持同一套装 slug 稳定，只改变 locale 前缀，除非有完整迁移和重定向方案；
- 页面正文应提供真实尺寸和实用解释，不要为了 SEO 堆砌固定数据量、重复关键词或不准确的官方表述。

## 9. 数据库和部署脚手架

仓库包含 `db/`、`drizzle.config.ts`、`drizzle/`、`worker/` 和 `.openai/hosting.json`，这是项目模板保留的 Cloudflare D1/Worker 脚手架：

- `db/schema.ts` 当前为空；
- `.openai/hosting.json` 中 `d1` 和 `r2` 均为 null；
- 没有页面或数据流程调用 `getDb()`；
- 套装数据仍由静态 JSON 提供。

不要把这些文件描述成“网站当前数据库”。只有在用户明确要求用户账户、收藏、提交、后台更新等动态功能时，才评估启用数据库，并同时设计迁移、环境绑定、隐私和测试。

## 10. 验证清单

任何涉及数据、页面、路由、文案或样式的修改，至少执行：

```bash
npx tsc --noEmit
npm run lint
npm test
```

`tests/rendered-html.test.mjs` 当前覆盖：

- 英文首页；
- 套装库首屏 24 条和渐进加载入口；
- 官方尺寸、描述直取、补全规划尺寸和无固定尺寸等代表性详情；
- 德语独立索引页面；
- 简体中文独立索引页面及“柜子是否能装得下”计算器文案；
- 柜架尺寸本地保存对应的隐私说明；
- 国旗语言选项；
- 英文/德文页面的非预期中文、禁止的快照日期和已移除 API 文档链接等回归项。

浏览器验证至少抽查：

- `/en`
- `/en/sets`
- `/de/sets`
- `/zh/sets`
- `/zh/sets/10294-titanic-dimensions`
- `/en/sets/10294-titanic-dimensions`
- 一个无固定尺寸的套装页

重点检查：状态码、控制台错误、图片/占位符、筛选、自动加载和按钮加载、语言切换同页跳转、计算器正常/旋转/不适配三个结果、移动端布局、页面源代码中的 metadata 与 `hreflang`。

## 11. 修改时的高风险点

- 轴向混淆：不要把排序后的 small/medium/large 当成有方向 H/W/D。
- 数据泄露：原始 JSON 含中文内部注释；即使在中文站点，也不要直接把未经用户化改写的 raw record 传到可见 UI。
- 来源误导：包装数据、Brickset API 值、产品描述和官方成品尺寸不是同一种证据。
- 固定数量：不要在 UI、metadata 或营销文案硬编码 500。
- 固定日期：不要把抓取日期重新带回首页、列表页或详情页。
- i18n 漏项：新增文案要同时补齐每个已发布 locale，TypeScript 通过不代表语义翻译正确。
- SEO 分裂：不要为不同语言生成不一致的套装身份、重复 canonical 或缺失 alternate。
- 图片假设：数据记录数和本地图片数不一定相同，始终支持缺图状态。
- 隐私承诺：隐私页声明柜架尺寸和单位只保存在当前浏览器本地，不会发送到服务器，并且没有广告 Cookie 或用户提交。PostHog 分析必须继续保持明确同意后才采集，并允许用户从页脚撤回；扩大采集范围、启用录屏、AdSense、云同步或提交功能前，必须同步更新同意机制和隐私政策。
- 开发服务器陈旧：完成修改后用生产构建和测试判定，再确认本地浏览器连接的是最新进程。

## 12. 完成标准

一次改动只有在以下条件满足后才算完成：

- 行为符合本文件中的产品和数据约束；
- 所有已发布语言的文案和 SEO 保持完整；
- 类型检查、lint 和测试通过；
- 相关页面已在本地实际验证；
- 没有把内部核验注释、置信等级、固定数据量或快照日期意外暴露给普通用户，英文和德文页面中也没有中文泄漏；
- 没有把包装尺寸误当作成品尺寸，也没有为无固定外包络的产品编造尺寸。
