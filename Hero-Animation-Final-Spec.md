# Hero Section Animation: Final Specification (收敛设计定稿)

## 🎯 核心概念：粒子黑洞效应 (Particle Black Hole Effect)
基于“海量信息，一处掌控”的视觉隐喻，多渠道对话框如粒子般被吸引至中心的 Memoh Logo。这是一场约 **4-6秒的沉浸式视觉体验**，中途伴随核心信息的平滑展示。

---

## 🎨 1. 原子化设计规范 (Atomic Design Specs)

### 1.1 对话框组件 (Chat Bubble Node)
- **视觉风格**:
  - 形状：圆角 `rounded-xl`
  - 材质：玻璃拟态 (Glassmorphism)，`backdrop-blur-md` 配合 `bg-white/10` (暗黑模式下 `bg-slate-800/80`)
  - 边框：极细的半透明边框 `border border-white/10`
  - 阴影：柔和的悬浮阴影 `shadow-lg`
- **内容构成 (极简骨架屏)**:
  - 左侧：**单色化/主题化的平台 Logo Icon** (Slack, Telegram 等，如纯白或亮蓝色)，确保极高的视觉统一感。
  - 右侧：**两行骨架屏 (Skeleton)** 代表名称与内容文本。
- **交互状态**:
  - 演出期间为 **Ghost/Pass-through (忽略鼠标交互)** 状态，鼠标悬浮不产生排斥或打断，保证顺滑。

### 1.2 中心锚点 (Memoh Logo)
- **状态变化**:
  - 初始：常态的 Memoh Logo。
  - 吸收中：随着对话框吸入，Logo 底部产生呼吸发光效果 (`drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]`)。
  - 最终稳态：吸收完成后，Logo **保持极低调的轻微呼吸感 (Subtle Breathing)**，暗示 AI 引擎在背景时刻运转。

### 1.3 背景氛围 (Background Atmosphere)
- **视觉层**: 参考 Affinity Studio 高级质感，使用极暗或纯白背景，深层带有 **柔和的高质感噪点网格渐变 (Grainy Mesh Gradient)**，在屏幕四周极其缓慢地流转。

### 1.4 “跳过演出”按钮 (Skip Button)
- **位置与样式**: 页面**右下角** (`bottom-8 right-8`)。低调的悬浮样式 (半透明黑底 + 白色文字)，Hover 时高亮。

---

## 🎬 2. 前端动效与技术需求 (Animation & Tech Specs)

### 2.1 整体编排 (Choreography Timeline - 4~6s)
- **[0.0s - 1.0s] 极坐标生成期**:
  - 对话框围绕中心 Logo 采用 **极坐标规律分布 (Polar Distribution)** 浮现，确保分布均匀、无重叠且视觉平衡。
- **[1.0s - 4.0s] 坍缩与吸收期**:
  - 气泡从极坐标位置向中心 Logo 坐标缓动（`ease-in-out`）移动。
  - 靠近中心时，`scale -> 0.2`, `opacity -> 0`。
- **[2.0s - 3.0s] 文案并发渐显 (Concurrent Fade-in)**:
  - 动画进行到一半时，主标题 (H1) 和操作按钮 (CTA) 随之柔和淡入，无需等待气泡全吸完即可操作。
- **[4.0s - 6.0s] 尾声与稳态**:
  - 气泡全部消失，Logo 维持轻微的呼吸发光，网格渐变持续流动。

### 2.2 响应式与性能降级 (Responsiveness & Degradation)
- **移动端适配 (Mobile)**:
  - **保持尺寸，减少数量**：气泡保持正常的物理可读尺寸，同屏生成数量严格限制在 **3-5 个**（桌面端可为 15-20 个），防止屏幕拥挤和溢出。
- **性能降级策略 (FPS First)**:
  - 监控渲染帧率，若检测到设备卡顿/低于 30fps，自动减半同屏渲染的气泡数量，保底流畅度。
- **无障碍/边缘设备路径 (Fallback & Reduced Motion)**:
  - **无需媒体回退** (No Video/Image Fallback) 以换取极小的包体积。
  - 若系统开启“减少动画”或触发 Skip，直接取消位移/缩放，利用 300ms 的极短透明度渐变直接展示最终首屏（完整的标题、按钮、带呼吸的 Logo，以及散落几个静态透明气泡）。

---

## 🛠 3. 工程落地结构设计 (Engineering Implementation)

### 3.1 Vue 组件结构 (Component Scope)
- 气泡组件将作为 **内联私有模板/组件 (Inline Component)** 直接编写在 `HeroSection.vue` 内部（如使用 `<template id="chat-bubble">` 或同一个 SFC 内的内联结构）。
- **设计初衷**：降低工程组件库的复杂度，保证特定页面演出的高内聚。

### 3.2 状态管理 (State Management)
- 使用 Vue 3 的 **局部响应式状态 (`ref`)** 进行管理（如 `const isPlaying = ref(true)` 和 `const currentStage = ref(0)`）。
- **设计初衷**：动效生命周期局限于首屏组件内部，无需引入 Pinia 增加全局开销，轻量且直观。

### 3.3 DOM 数据与坐标
- 数据结构由 `ref` 数组控制，每一项定义一个气泡的 `id`, `angle` (极坐标角度), `radius` (极坐标半径), `delay` (出现延迟), `iconType` (平台类型)。
- 利用 `cos()` 和 `sin()` 函数在模板中绑定初始的 `translate` 偏移量。
