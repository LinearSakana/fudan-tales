# 🎨 UI 组件库文档

## 1. 基础 UI 组件 (Base UI)

### `ActionButton`

**描述**: 一个带有图标、主标签和副标签的方形按钮。通常用于仪表盘或快速操作区。
**视觉风格**: 半透明背景，Hover 时高亮，点击有缩放效果。
**文件路径**: `src/components/ui/ActionButton.jsx`

| Prop 名  | 类型     | 默认值 | 描述                         |
|:--------|:-------|:----|:---------------------------|
| `icon`  | String | -   | 图标名称 (对应 class`font-icon`) |
| `label` | String | -   | 主按钮文字                      |
| `sub`   | String | -   | 按钮下方的微小副文本                 |

**示例**:

```jsx
<ActionButton icon="settings" label="系统设置" sub="CONFIG"/>
```

---

### `BilingualText`

**描述**: 风格化的双语文本展示组件。用于标题或重要标签，营造由于不仅/机密文件的氛围。
**视觉风格**: 中文为主，英文为辅（等宽字体、全大写、带 `//` 前缀）。
**文件路径**: `src/components/ui/BilingualText.jsx`

| Prop 名      | 类型     | 默认值 | 描述               |
|:------------|:-------|:----|:-----------------|
| `cn`        | String | -   | 中文内容 (主要)        |
| `en`        | String | -   | 英文内容 (次要，会自动转大写) |
| `className` | String | ""  | 额外的容器样式          |

**示例**:

```jsx
<BilingualText cn="记忆档案" en="MEMORY ARCHIVE" className="text-xl"/>
```

---

### `ToggleItem`

**描述**: 带有说明文字和开关控件的列表项。
**视觉风格**: 赛博朋克风格的开关，支持颜色变体。
**文件路径**: `src/components/ui/ToggleItem.jsx`

| Prop 名    | 类型       | 默认值       | 描述                         |
|:----------|:---------|:----------|:---------------------------|
| `label`   | String   | -         | 开关标题                       |
| `desc`    | String   | -         | 开关下方的描述文本                  |
| `active`  | Boolean  | -         | 开关状态                       |
| `onClick` | Function | -         | 点击回调                       |
| `color`   | String   | "primary" | "primary"(粉红) 或 "cyan"(青色) |

---

## 2. 布局与导航 (Layout & Navigation)

### `LayoutEffects`

**描述**: 全局背景特效层。用于营造氛围（噪点、扫描线、晕影等）。通常放在页面的最底层。
**文件路径**: `src/components/layout/LayoutEffects.jsx`

| Prop 名      | 类型      | 默认值    | 描述                       |
|:------------|:--------|:-------|:-------------------------|
| `noise`     | String  | "soft" | 噪点强度 ("soft"\| "strong") |
| `scanlines` | Boolean | true   | 是否显示 CRT 扫描线             |
| `glow`      | Boolean | false  | 是否显示右上角环境光               |
| `vignette`  | Boolean | false  | 是否显示暗角                   |
| `grid`      | Boolean | false  | 是否显示背景网格                 |

---

### `Header` (通用)

**描述**: 通用的二级页面顶部导航栏。包含返回按钮和标题。
**视觉风格**: 顶部吸附，带有脉冲动画的点缀。
**文件路径**: `src/components/ui/Header.jsx`

| Prop 名      | 类型     | 默认值          | 描述                   |
|:------------|:-------|:-------------|:---------------------|
| `title`     | String | "?"          | 页面大标题                |
| `subtitle`  | String | "?"          | 页面副标题 (闪烁效果)         |
| `icon`      | String | "arrow_back" | 返回/左侧按钮图标            |
| `iconText`  | String | "?"          | 按钮旁边的文字              |
| `rightText` | String | ""           | 右侧状态文字 (如: "ONLINE") |

---

### `BottomNav`

**描述**: 底部固定导航栏。用于应用的主要 Tabs 切换。
**注意**: 此组件目前硬编码了 tab items (`home`, `atlas`, `sleep`, `me`)，复用时可能需要重构 `items` 为 prop。
**文件路径**: `src/components/ui/BottomNav.jsx`

| Prop 名       | 类型       | 默认值     | 描述                       |
|:-------------|:---------|:--------|:-------------------------|
| `activeKey`  | String   | "atlas" | 当前选中的 Tab Key            |
| `onNavigate` | Function | -       | 切换 Tab 回调`(key) => void` |

---

### `AtlasHeader` (专用)

**描述**: "Atlas / 图鉴" 页面的专用头部。包含分区（Zone）筛选器。
**文件路径**: `src/components/AtlasHeader.jsx`

| Prop 名         | 类型            | 默认值          | 描述                     |
|:---------------|:--------------|:-------------|:-----------------------|
| `title`        | String        | "ARCHIVE..." | 大标题                    |
| `zones`        | Array<String> | []           | 分区列表 (如`['F1', 'F2']`) |
| `activeZone`   | String        | -            | 当前激活的分区                |
| `onZoneChange` | Function      | -            | 切换分区回调                 |
| `syncText`     | String        | -            | 右下角状态文本                |

---

## 3. 业务/实体组件 (Domain Components)

### `EntityCard`

**描述**: 展示单个实体（如 SCP 对象、角色）的状态卡片。
**视觉风格**: 竖向卡片，包含封面图、进度条、状态角标。
**文件路径**: `src/components/EntityCard.jsx`

| Prop 名     | 类型       | 默认值         | 描述                                       |
|:-----------|:---------|:------------|:-----------------------------------------|
| `code`     | String   | -           | 编号 (如 SCP-001)                           |
| `title`    | String   | -           | 标题                                       |
| `coverUrl` | String   | -           | 背景图片 URL                                 |
| `status`   | String   | "contained" | "contained" (绿色/主色)\| "analyzing" (黄色警告) |
| `progress` | Number   | 1           | 0~1 之间的浮点数 (进度条)                         |
| `onClick`  | Function | -           | 点击回调                                     |

---

### `LockedCard`

**描述**: `EntityCard` 的未解锁状态变体。
**视觉风格**: 灰阶、高对比度、带锁图标和模糊遮罩。
**文件路径**: `src/components/LockedCard.jsx`

| Prop 名          | 类型     | 默认值 | 描述           |
|:----------------|:-------|:----|:-------------|
| `requiredLevel` | Number | 5   | 解锁所需等级       |
| `coverUrl`      | String | -   | 背景图 (会显示为黑白) |

---

### `EngramList`

**描述**: 展示 "Engram" (记忆/物品) 网格的列表组件。内部处理了稀有度颜色逻辑。
**逻辑**: 根据传入对象的 `rarity` (legendary, epic, rare, common) 自动应用边框和光晕颜色。
**文件路径**: `src/components/EngramList.jsx`

| Prop 名     | 类型       | 描述                                                                                                                     |
|:-----------|:---------|:-----------------------------------------------------------------------------------------------------------------------|
| `engrams`  | Array    | 对象数组。对象结构需包含:`id`, `name`, `desc`, `icon`, `rarity`, `status`('locked'\|'parsing'\|'unlocked'), `progress`(if parsing) |
| `onSelect` | Function | 点击未锁定项目时的回调                                                                                                            |

---

### `EngramModal`

**描述**: "Engram" 的详情全屏弹窗。
**视觉风格**: 极高的“机密档案”沉浸感，包含入场动画、全息扫描效果、噪音背景。
**文件路径**: `src/components/EngramModal.jsx`

| Prop 名    | 类型       | 描述                               |
|:----------|:---------|:---------------------------------|
| `engram`  | Object   | 当前查看的 Engram 数据对象 (为`null` 时不渲染) |
| `onClose` | Function | 关闭回调 (组件内部处理了关闭动画延迟)             |

---

## 🎨 Token 与 样式指南 (Style Tokens)

生成新代码时可参照以下 Tailwind 类名组合：

* **文本颜色**:
    * 主色: `text-primary` (通常是 Neon Pink/Red)
    * 暗淡文本: `text-text-dim` (低对比度说明文)
    * 超小文本: `text-xxxs`, `text-nano`
* **背景**:
    * 玻璃拟态: `bg-white/5` 或 `bg-black/40` + `backdrop-blur`
    * 深色表面: `bg-surface-dark`, `bg-background-dark`
* **特效**:
    * 边框: `border border-white/10` (几乎所有卡片都有这个微弱边框)
    * 文字图标: `font-icon` (用于渲染图标字形)
    * 动画: `animate-pulse` (呼吸灯), `animate-ping` (雷达点)
* **字体**:
    * 装饰性标题: `font-display`
    * 数据/编号: `font-mono`
