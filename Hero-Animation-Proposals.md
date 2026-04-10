# Hero Section Animation Proposals: "Convergence of Conversations"

## 🎯 核心目标 (Core Objectives)
在首屏打造一个动态演出（Hero Animation），展现 Memoh 作为“全渠道 AI Agent 平台”的聚合能力。通过将来自 Telegram, Discord, Lark, WeChat, Email 等多渠道的对话框收敛至 Memoh Logo，向用户传达“海量信息，一处掌控”的视觉隐喻。

## 🎨 视觉与原子化设计规范 (Visual & Atomic Design Specifications)

### 1. 颜色与排版 (Colors & Typography)
- **Background**: 根据系统主题适配 Clean white (`#FFFFFF`) 或 Deep Dark (`#0F172A`)。
- **Primary Element (Memoh Logo)**: 居中，带有 Action-oriented Blue/Indigo 发光效果（Glow effect）。
- **Accents**: 现代渐变光晕（Modern gradients），在对象融合进 Logo 时产生微光反馈。
- **Typography**: Inter / System Sans-serif，用于对话框内部的极简文本展示。

### 2. 核心原子组件 (Core Atomic Components)
- **Chat Bubble (对话框组件)**:
  - **样式**: 参考 Figma 设计稿的圆角对话框形态（如 `rounded-xl`，背景采用玻璃拟态 `backdrop-blur-sm bg-white/10` 或 `bg-slate-800/80`）。
  - **构成**: 平台 Icon (Slack, Telegram, Matrix 等) + 用户头像/群组标识符 + 骨架屏文本 (Skeleton Text) 或真实截断文本。
- **Skip Button (跳过按钮)**:
  - 位于页面边缘，采用低透明度，Hover 时亮起，支持键盘焦点（Accessibility）。

### 3. 可访问性与性能 (Accessibility & Performance)
- **Reduced Motion (Motion 开关)**: 侦听 `prefers-reduced-motion: reduce` 媒体查询。当用户关闭动效时，必须提供优雅降级（Fallback）。
- **Performance**: 动效需使用 CSS `transform` (translate, scale) 和 `opacity` 以触发 GPU 硬件加速，避免引起重绘（Repaint）的属性如 `top`/`left`。

---

## 🎬 动效方案设计 (Animation Choreography Proposals)

### 方案 A：粒子黑洞效应 (Particle Black Hole)
- **视觉感受**: 高科技感、强引力、节奏紧凑。
- **动效描述**: 屏幕四周如同星空般随机生成各个平台的对话框。它们像被黑洞吸引一样，从边缘快速涌向屏幕中心的 Memoh Logo。随着靠近中心，对话框体积缩小（`scale: 1 -> 0.2`），透明度降低（`opacity: 1 -> 0`）。进入 Logo 瞬间触发一圈向外的微弱能量波纹（Ripple）。
- **移动端适配**: 减少生成的对话框数量（例如由同时存在 20 个减少到 8 个），缩短滑动轨迹，防止屏幕显得杂乱。
- **跳过机制**: 屏幕右下角提供 "Skip Intro ⏭"，点击后所有动画元素加速吸入 Logo（时长缩短为 0.3s），直接展示最终 UI。

### 方案 B：瀑布流时间线 (Waterfall Timeline)
- **视觉感受**: 优雅、从容、信息流的沉淀感。
- **动效描述**: 对话框仿佛时间线上的消息流，以较缓的速度从屏幕上方和两侧飘落（伴随轻微的 Y 轴和 X 轴漂移，类似树叶落下）。当它们进入距离 Logo 一定半径的“事件视界”时，开始被牵引，缓慢缩小并融化在发光的 Memoh Logo 中。
- **移动端适配**: 仅保留从屏幕顶部到底部的单向流动，避免横向空间过于拥挤。
- **跳过机制**: 点击“跳过”后，对话框原地淡出（Fade-out 0.5s），UI 核心内容平滑 Fade-in。

### 方案 C：舞台聚光灯 (Stage Spotlight)
- **视觉感受**: 聚焦感、交互性、带有弹跳反馈的趣味性。
- **动效描述**: Memoh Logo 位于中央的“聚光灯”下。对话框在四周依次弹出（Pop-up, `scale: 0 -> 1`, 附带 `cubic-bezier` 的 bounce 效果），稍微停顿 0.5 秒展示自身内容（如“Telegram 消息”），然后以抛物线轨迹快速被吸入 Logo 内部。
- **移动端适配**: 气泡仅在 Logo 上下方浮现，避开左右可能被手指遮挡的区域。
- **跳过机制**: 页面右上角出现一个低调的 "Skip ✖" 按钮，点击即立刻终止生成，现有气泡向四周散开淡出。

---

## 🛠 前端动效技术选型推荐
- **框架推荐**: 
  - **GSAP (GreenSock)**: 如果需要极高精度的抛物线运动或复杂的 timeline 编排。
  - **VueUse + CSS Transitions**: 使用 `@vueuse/core` 中的 `useRafFn` 或 `useAnimate`，结合 CSS 原生动画，体积更小，对于简单的生成和收缩已足够。
  - **Radix Vue (无障碍)**: 保证 Skip 按钮与后续的 Dialog/Modal 交互具备顶级的无障碍特性。
