# Tailwind 样式盘点与可抽离建议

> 目标：遍历现有页面与组件，聚焦重复/可统一的样式，按 Tailwind 常见设计规范提出可抽离的「布局层」「组件层」「文本/标签层」「效果层」等建议。

## 1) 全局页面布局与容器（建议抽成通用布局类/组件）

**重复形态**：多页面使用「手机容器」式布局（`max-w-md mx-auto w-full min-h-screen` + `bg-background-dark` + `shadow-2xl` + `overflow-hidden` 等），并叠加噪点/扫描线等背景层。Atlas / Profile / SleepMonitor / AtlasDetail 都有类似结构。建议抽为：

- `layout-page`：`relative min-h-screen w-full max-w-md mx-auto flex flex-col`。
- `layout-frame`：`bg-background-dark shadow-2xl overflow-hidden`（Atlas / SleepMonitor / Profile）。
- `layout-frame-light`：`bg-background-light dark:bg-background-dark`（AtlasDetail）。
- `layout-effects`：统一背景遮罩（`bg-noise`/`bg-scanlines`/radial vignette），可做成 `LayoutEffects` 组件或 `@layer components` 组合类。

**出现位置举例**
- Atlas 容器 + 背景噪点/扫描线 + radial vignette。【F:src/pages/Atlas.jsx†L24-L91】
- Profile 容器 + 背景噪点/扫描线。【F:src/pages/Profile.jsx†L43-L121】
- SleepMonitor 容器 + 背景噪点/扫描线 + radial vignette。【F:src/pages/SleepMonitor.jsx†L13-L179】
- AtlasDetail 容器 + max-w + shadow + bg-noise。【F:src/pages/AtlasDetail.jsx†L82-L90】

**Tailwind 规范建议**
- 统一为「layout」语义类，避免每个页面拷贝相同 class 字符串。
- 背景层建议统一成 `LayoutEffects`（例如 `<LayoutEffects variant="scanlines" />`）。

## 2) 导航/头部区域（建议抽成 Header/TopBar 组合样式）

**重复形态**：头部常用 `border-b border-white/10` + `bg-*` + `backdrop-blur`。AtlasHeader / AtlasDetail / SleepMonitor 顶栏结构类似。

- `header-bar`: `flex items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-sm`（SleepMonitor / AtlasDetail）。
- `header-bar-dark`: `bg-background-dark/80 backdrop-blur-md border-white/5`（AtlasHeader）。

**出现位置举例**
- AtlasHeader 顶栏与分区按钮带边框风格。【F:src/components/AtlasHeader.jsx†L12-L58】
- AtlasDetail 顶栏样式（sticky + border + backdrop）。【F:src/pages/AtlasDetail.jsx†L87-L109】
- SleepMonitor 顶栏样式（border + bg-black/80 + blur）。【F:src/pages/SleepMonitor.jsx†L31-L48】

**Tailwind 规范建议**
- 把 header style 分为 `header-bar` 与 `header-chip`/`header-pill` 组件，避免多处手动拼 class。

## 3) 卡片与容器（建议抽成 Card 系统）

**重复形态**：玻璃拟态 / 暗色卡片 / 边框 + 圆角 + padding + hover glow 等。

- `card-glass`: 目前已有 `.glass-card`（透明 + blur + border），建议和 `card-hover-glow` 一并组合成标准卡片类型（`card-glass`, `card-glass-interactive`）。【F:src/index.css†L39-L119】
- `card-dark`：`bg-black/40 border border-white/10 rounded-* p-*`，如 Profile 校准图表卡、SleepMonitor 统计卡、EngramModal 图片区域。

**出现位置举例**
- Profile 统计卡 + hover glow + scanline overlay。【F:src/pages/Profile.jsx†L132-L150】
- Profile 校准图表卡（玻璃拟态 + border + bg-black/40）。【F:src/pages/Profile.jsx†L166-L172】
- EngramList 卡片统一布局（rounded-xl + border + gap + hover scale）。【F:src/components/EngramList.jsx†L20-L79】
- EntityCard / LockedCard 的玻璃卡与 hover glow 组合。【F:src/components/EntityCard.jsx†L26-L63】

**Tailwind 规范建议**
- 统一卡片的边框色与背景色（如 `border-white/10`, `bg-background-dark/80`, `rounded-lg/xl`）。
- 通过 `@layer components` 定义 `card-base`, `card-glass`, `card-flat`, `card-interactive` 组合类。

## 4) 标签/徽章/状态条（建议统一 badge/label 体系）

**重复形态**：小字号标签 + `font-mono` + uppercase + tracking，常用于状态/稀有度/元信息。

- `badge`: `text-nano uppercase font-mono tracking-widest rounded border px-1.5 py-0.5`。
- `badge-soft`: `bg-white/5 border-white/10 text-text-dim`。
- `badge-primary`: `bg-primary/20 border-primary/30 text-primary`。

**出现位置举例**

- EngramList 稀有度标签（text-nano, border, font-mono）。【F:src/components/EngramList.jsx†L38-L45】
- EntityCard 右上角状态徽章（bg-black/60 + border + text）。【F:src/components/EntityCard.jsx†L26-L41】
- Profile 身份等级标签（text-[xxxs, border, bg）。【F:src/pages/Profile.jsx†L93-L98】
- AtlasHeader 同步信息（text-xxs + font-mono）。【F:src/components/AtlasHeader.jsx†L54-L56】

**Tailwind 规范建议**
- 使用统一 `badge` 体系：大小/字重/间距一致，颜色改为 `variant` 传参（`badge badge-primary`, `badge badge-muted`）。

## 5) 进度条/状态条（建议统一 progress 组件）

**重复形态**：细高进度条，`rounded-full/rounded`, `bg-white/10` + `bg-primary`。

- `progress-track`: `h-1 w-full bg-white/10 rounded-full overflow-hidden`。
- `progress-bar`: `h-full bg-primary`（或 `bg-yellow-500`）。

**出现位置举例**
- EntityCard 卡片底部进度条。【F:src/components/EntityCard.jsx†L58-L60】
- EngramList parsing 进度条。【F:src/components/EngramList.jsx†L58-L64】
- Profile sanity bar track + bar。【F:src/pages/Profile.jsx†L109-L113】
- AtlasDetail 解密进度条。【F:src/pages/AtlasDetail.jsx†L118-L123】

**Tailwind 规范建议**
- 抽 `progress` 组件，track/bar 统一高度与圆角，避免用 `h-0.5`、`h-1`、`h-1.5` 混杂。

## 6) 文本层级与字号体系（建议统一 typography scale）

**观察**：项目大量使用自定义像素字号（`text-[8px]`, `text-[9px]`, `text-[10px]`），且存在 `tracking-[0.2em]` 等多处重复。

**出现位置举例**
- 细文字号与 tracking 在 SleepMonitor 顶栏、状态信息中反复出现。【F:src/pages/SleepMonitor.jsx†L31-L76】
- AtlasDetail 中小字号在标签与提示中重复使用。【F:src/pages/AtlasDetail.jsx†L114-L175】
- BilingualText 组件内固定字体与字号风格。【F:src/components/ui/BilingualText.jsx†L7-L11】

**Tailwind 规范建议**
- 定义 `text-xxs`、`text-xxxs` 等自定义字号（在 `theme.extend.fontSize`），减少 `text-[9px]` 的任意值。
- 统一 `tracking-widest`/`tracking-[0.2em]` 等为可复用类（例如 `label-tight`, `label-wide`）。

## 7) 背景/效果层（建议统一 Effects Utilities）

**重复形态**：`bg-noise`, `bg-scanlines`, `bg-grid-pattern`, `glitch-text`, `holo-scan`、`scanline-overlay` 等。

**出现位置举例**
- index.css 内已有多种 utilities/组件，实际页面/组件大量重复叠加背景类。【F:src/index.css†L39-L174】
- Atlas / Profile / SleepMonitor 中重复使用 noise + scanlines overlay。【F:src/pages/Atlas.jsx†L25-L91】【F:src/pages/Profile.jsx†L51-L121】【F:src/pages/SleepMonitor.jsx†L18-L179】
- EngramList / EngramModal 等使用 holo-scan / bg-grid-pattern。【F:src/components/EngramList.jsx†L76-L82】【F:src/components/EngramModal.jsx†L58-L88】

**Tailwind 规范建议**
- 把常用组合封装为 `effect-*` 组件类，例如：
  - `.effect-scanlines` = `bg-scanlines opacity-10 pointer-events-none`
  - `.effect-noise` = `bg-noise opacity-20 mix-blend-overlay pointer-events-none`
  - `.effect-vignette` = radial-gradient overlay
- 这样页面只需插入 `<LayoutEffects/>` 或 `<EffectsLayer/>`。

## 8) 操作按钮（建议统一 button 体系）

**重复形态**：主要按钮常见 `bg-primary/20 border-primary/50 text-primary hover:bg-primary hover:text-white`；次要按钮 `bg-white/5 border-white/10 text-white`。

**出现位置举例**
- EngramModal 主按钮/次按钮风格。【F:src/components/EngramModal.jsx†L115-L126】
- Atlas floating button（primary + border + hover）。【F:src/pages/Atlas.jsx†L71-L75】
- SleepMonitor “滑动启动”按钮区（深色背景 + primary 边框/阴影）。【F:src/pages/SleepMonitor.jsx†L143-L151】

**Tailwind 规范建议**
- 抽 `btn-primary`, `btn-outline`, `btn-ghost` 三个基础按钮类，统一圆角、文字大小、间距。

---

# 建议落地路线（不改视觉的情况下提升一致性）

1. **布局层**：先抽 `layout-page` + `layout-frame` + `LayoutEffects` 组件（覆盖 Atlas/Profile/SleepMonitor）。
2. **组件层**：抽 `card-*` + `badge-*` + `progress-*` + `btn-*` 系列。
3. **文本层**：定义 `fontSize` scale（`xxs`, `xxxs`）并替换 `text-[9px]` 等任意值。
4. **效果层**：把 noise/scanlines/vignette/grid 组合成 `effect-*` utilities。

以上抽离均可放在 `@layer components` 或 `@layer utilities`，遵循 Tailwind 常规实践，减少 className 噪音并增强一致性。
