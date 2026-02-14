# Repository Guidelines

我要开发一款基于复旦校园文化的游戏化睡眠管理 APP Demo。prd.txt
仅供参考，其中内容已过时。可以复用现有的组件/设计规范，并适当创新，创造多样化的风格。代码应当遵循常见的开发规范，不能乱造轮子，或者弄出任何不利于后续维护的设计。

## Project Structure & Module Organization

- `src/` contains the React app.
- `src/pages/` holds route-level screens (`Home.jsx`, `AtlasDetail.jsx`, etc.).
- `src/components/` contains reusable UI and layout pieces (`ui/`, `layout/`).
- `src/data/` stores static content and mock domain data.
- `src/assets/` stores local assets (fonts, icons).
- `public/` contains static files served directly (for example `public/images/atlas/cards/`).
- `docs/` includes internal style/component reference notes.
- `android/` is the Capacitor Android project for native packaging.

## Build, Test, and Development Commands

- `npm run dev`: start Vite dev server with hot reload.
- `npm run build`: create production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint across the repository.
- `npm i -D xxxx`: install a new dependency.
- `npx cap sync android`: sync web build and Capacitor config into Android project.
- `cd android && .\gradlew.bat test`: run Android unit tests.
- 重要提醒！目前沙箱配置有问题，敏感指令（例如，npm）直接提权运行即可，不需要在沙箱里浪费时间折腾。

## Coding Style & Naming Conventions

- Stack: JavaScript + Tailwind + React (ES modules, JSX).
- Follow ESLint (`eslint.config.js`) before opening a PR.
- Use 4-space indentation and keep existing brace/spacing style consistent with nearby files.
- Components/pages use `PascalCase` filenames (`ActionButton.jsx`, `SleepMonitor.jsx`).
- Data/helper modules use kebab-case (`home-data.js`, `card-details.js`).
- Prefer Tailwind utility classes and existing theme tokens from `tailwind.config.js`.
- 写代码要采用适当的中文注释！如果发觉已有文件注释太少，可以顺手补充一些注释，帮助用户理解代码逻辑。

## Testing Guidelines

- There is currently no dedicated JS test runner configured in `package.json`.
- Minimum requirement for UI changes: `npm run lint` and manual verification via `npm run dev`.
- For Android-native changes, run `.\gradlew.bat test` inside `android/`.
- If you introduce JS tests, use `*.test.jsx` naming and place them next to the related module or under
  `src/__tests__/`.

---

关于项目其他参考文档，请查看 `docs/` 目录中的相关文件。

- docs/style-guides.md：UI 设计和样式指南。
- docs/components.md：组件库参考。

附加提示：注意！当用户向你提出需求时，如果你发现缺少了需告知的信息或需求描述不够详细，请不要开始生成，而是向用户索要你所需的信息，直到你有
95% 的把握能完成好任务，才能开始正式生成。
