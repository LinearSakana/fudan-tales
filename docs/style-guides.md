## 1. 设计定位与核心风格

### 视觉母题

1. **暗色赛博底**：整体以深色背景为舞台（`background-dark` + 近黑叠层），内容依靠对比度与微弱高光呈现层次。
2. **品红主色强调**：`primary`（#ff0055）用于重点、交互态、进度条、选中态、发光等。不要滥用；它是“信号”。
3. **玻璃拟态 + 噪点/扫描线**：用轻微透明、模糊、边框来制造“面板”，再叠加 noise/scanlines/grid 等效果纹理。

### 设计关键词

- **高对比、低饱和背景、重点高饱和**
- **小字号信息密度**
- **等宽数据质感**（数据类内容统一 `font-mono`）
- **微动效**：hover 放大、modal 扫描进入、进度发光

## 2. 色彩系统

### 语义色

- `primary` / `primary-dark`：交互主色、关键标识（按钮、强调、进度、选中、发光）
- `background-dark`：页面主背景
- `surface-dark`：暗色卡片/容器底（更接近“面板”）
- `background-light`：仅在 light 模式或特殊页面使用（不要用就行）
- `text-dim`：辅助说明、次要信息、标签

### 使用规则

- **主信息**：白色或接近白（文字默认颜色）
- **次要信息**：`text-dim` 或 `white/70`
- **强调信息**：`primary`（表示强调，例如，鼠标悬停到某个按钮时）
- **分割线/边框**：`white/10` 为默认强度，`white/5` 更弱
- **警示**： `badge-warning`、`progress-bar-warning`（黄色系），用于“告警”场景

## 3. 字体与排版

### 字体家族

- 默认正文：`font-sans`
- 标题展示：`font-display`（更“海报感”）
- 数据/编号/代码：`font-mono`（也可用 `.data-text` 强制并加紧凑字距）
- 图标：`font-icon`（仅用于 Material Symbols）

### 字号策略

- `xxxs`/`nano`：极小标签、角标、辅助元信息（谨慎使用，确保可读）
- `text-xxs`：副标题、标签体系的主力字号
- 标题：用 `font-display` + 更紧凑字距（参考 `.header-title`）

### 字距与大写

- 标签/徽章常用：`uppercase` + `tracking-widest`
  目标是“仪表盘/控制台感”，不适合整段的正文。

## 4. 基础布局范式（页面骨架）

### 页面容器

项目偏移动端体验，常用约束：

- `.layout-page`：中心列、最大宽度（`max-w-md`）、纵向 flex、最小高度为屏幕
- `.layout-frame`：外框底色与阴影，负责“设备屏幕/面板”质感
- `.layout-frame-light`：用于 light/dark 混合场景

### Header / TopBar

- `.header-bar`：顶部栏（半透明黑底 + blur + 底部分割线）
- `.header-title`：标题用 display 字体
- `.header-subtitle`：`10px` 等宽/大写/高字距的副标题

## 5. 卡片系统

### 卡片的三层结构（建议你按这个思路搭）

1. **容器基底**：`.card-base`（圆角、边框、裁剪、相对定位）
2. **材质风格**：`.card-glass`（玻璃拟态）或 `.card-dark`（暗面板）
3. **交互行为**：`.card-interactive` + 可选 `.card-hover-glow`

### 何时用 glass，何时用 dark

- **glass**：用于“浮层感、情绪化、装饰更强”的模块（例如概览卡、展示卡）
- **dark**：用于“内容密集、需要干净对比”的模块（列表项、数据面板）

## 6. 徽章（Badge）/标签体系

### 使用目的

- 快速表达属性：状态、类型、稀有度、地区、锁定/未解锁等。

### 组合方式

- `.badge` 作为基础形态（超小字号、等宽、大写、高字距、描边）
- 语义变体：
    - `.badge-muted`：默认弱信息
    - `.badge-primary`：关键信息
    - `.badge-warning`：风险/告警

## 7. 进度条（Progress）

### 组件语义

- `.progress-track`：轨道
- 轨道尺寸：`.progress-track-sm` / `.progress-track-md`
- `.progress-bar`：填充条（默认主色）
- `.progress-bar-warning`：告警色填充
- `.progress-bar-glow`：发光强调（只给关键进度，不要全都发光）

## 8. 按钮系统

###基础原则

按钮以“轮廓 + 半透明填充”为主，不走大面积纯色，以免压过内容。

### 分类

- `.btn-base`：统一尺寸、字体、字距、过渡
- `.btn-primary`：重要操作（主色半透明、hover 变实）
- `.btn-secondary`：普通操作（白色弱底）
- `.btn-ghost`：轻量操作（透明底 + 细边框）（目前暂无应用）

## 9. 效果纹理层（营造氛围）

### 常见效果

- noise：`.effect-noise` / `.effect-noise-soft`
- scanlines：`.effect-scanlines` / `.effect-scanlines-soft`
- grid：`.effect-grid` / `.effect-grid-soft`
- glow：`.effect-glow`
- vignette：`.effect-vignette`

### 使用规则

- 效果层通常是 **pointer-events: none**，并放在容器底部或顶部的装饰层级
- `soft` 变体用于背景常驻，非 soft 用于突出某个面板/弹层

## 10. 交互反馈

### 卡片交互

- hover 缩放：`.card-interactive`
- hover 发光边缘：`.card-hover-glow`
  移动端 hover 不明显，但保留不会出错。

### Modal 进入

- `.animate-modal-entry` 使用扫描式入场：缩放 + 位移 + clip-path
  用于弹窗出现。

### 特殊效果

- `.holo-scan`：全息扫光（强调型组件）
- `.glitch-text`：故障文本（仅用于少数标题/提示，且需要 `data-text`）
- `.blur-cipher`：未解锁状态/加密展示（hover 解除模糊的交互暗示）

## 11. 信息呈现与状态设计

### 状态优先级（从强到弱）

1. **可操作/可点击**：边框更亮、hover 动效、主色提示
2. **已选中/当前**：使用 `primary` 或 `primary/20` 的底/描边
3. **禁用/未解锁**：`.blur-cipher` 或更弱的对比（并减少交互动效）
4. **纯展示**：使用 `muted` 标签和弱边框即可

### “数据感”规则

- 编号、百分比、时间、统计值：优先 `.data-text` 或 `font-mono`
- 元信息：用 `text-xxs` + `tracking-widest` 的模式保持一致

## 12. 落地方法（写页面/组件时怎么做）

### 先选范式再写 UI

1. 这是一个页面还是一个卡片模块？
2. 需要 header 吗？
3. 内容密集还是展示为主？（决定 `.card-dark` vs `.card-glass`）
4. 是否需要强调态？（只挑一个元素给 `primary`）
5. 是否需要效果层？（优先 soft）

### 推荐的 class 组合

- **页面**：`.layout-page` → `.layout-frame` → 内容区
- **卡片**：`.card-base` + (`.card-glass` 或 `.card-dark`) + 可选 `.card-interactive`
- **标签**：`.badge` + 语义变体
- **按钮**：`.btn-base` + 语义变体
- **数据**：`.data-text`

## 13. 自查清单

- 颜色是否只用了 1 个主强调点？（避免满屏品红）
- 次要信息是否统一变弱（`text-dim`/透明白）？
- 数据是否用等宽字体呈现？
- 卡片是否遵循 “base + 材质 + 交互” 三段式？
- 效果层是否不会挡交互（pointer-events:none）？
- 小字号（`10px`/`9px`/`8px`）是否仍可读、对比足够？

以上指南覆盖了当前项目的主要设计范式与落地方式，照这个体系写组件，整体就会保持一致的“暗色赛博面板”体验。
