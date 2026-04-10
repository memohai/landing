# Figma Make 原子化生成提示词：MemohAI 落地页 (Pro Max 极致细节版)

> **使用说明：** 为了打破 Figma Make 的随机发挥，这份提示词采用了**最高级别的原子化描述**。请将以下提示词完整地或按模块 (Module) 逐一喂给 Figma Make。如果一次性生成失败，请按照 Module 1、Module 2 的顺序依次生成并拼装。

---

## ⚙️ Module 0: 全局画板与设计系统基调 (Global Settings)
在开始生成任何具体组件之前，必须绝对遵守以下全局限制：

1. **Root Frame (根画布)**：
   - Width: 严格 `1080px`。
   - Height: `Hug Content` (适应内容高度)。
   - Fill (背景色): 纯白 `#FFFFFF`。
   - Layout: `Auto Layout`, Direction: `Vertical`, Gap: `0px`。
2. **极度扁平原则 (Zero Drop Shadow)**：
   - 除非在后续指令中明确写出“【应用双态阴影】”，否则整个页面的**所有**卡片、按钮、输入框、图片框，`Drop shadow` 必须强制设定为 `0`。
3. **描边原则 (1px Crisp Borders)**：
   - 使用 `1px Solid #E2E8F0` 作为唯一的层级分割手段。所有卡片的描边都使用这个颜色，不要使用更粗的边框。
4. **紫色稀缺 (Purple Scarcity)**：
   - 品牌紫 `#6366F1`。你**只能**在下面我明确指出的 `Get Started` 和 `Deploy` 按钮上使用它。禁止将其用作文字高亮或卡片背景。
5. **奢侈留白 (Generous Padding)**：
   - 卡片的内部 Padding (内边距) 最低要求为 `32px`，推荐 `48px`。不要让文字挤在边框上。
6. **字体指定 (Typography)**：
   - 标题与正文：`Inter`。
   - 代码、标签、技术词汇：`Fira Code` 或任何 Mono 等宽字体。主标题字色 `#0F172A`，正文字色 `#475569`。

---

## 🧱 Module 1: 悬浮导航栏 (Sticky Navigation)
生成一个顶部导航栏，放在画板最顶端。
*   **Frame 设置**：Width `1080px`, Height `64px`, Auto Layout (Horizontal, Space between, Align: Center), Padding: Left `32px`, Right `32px`。
*   **背景与描边**：Fill `#FFFFFF`。Border: 仅底部 `Bottom 1px Solid #E2E8F0`。
*   **【应用双态阴影】**：添加 Drop shadow (Y: 4, Blur: 12, Color: #000000 5%)。
*   **Left Frame (左侧区)**：Auto Layout, Horizontal, Gap `32px`, Align Center。
    *   **Logo**：文字 `Memoh`，字体 `Fira Code`, Bold, `20px`, 色值 `#0F172A`。
    *   **链接组**：文字 `Docs`, `GitHub`, `Supermarket`，字体 `Inter`, Medium, `14px`, 色值 `#475569`。
*   **Right Frame (右侧区)**：Auto Layout, Horizontal, Gap `24px`, Align Center。
    *   **Motion Switch**：文字 `[Motion: OFF]`，字体 `Fira Code`, `12px`, 色值 `#94A3B8`。
    *   **Primary Button (极度重要)**：Auto Layout, Padding: `8px 16px`, Corner Radius `6px`。Fill: `#6366F1` (品牌紫)。Text: `Get Started` (`Inter`, SemiBold, `14px`, `#FFFFFF`)。没有阴影。

---

## 🧱 Module 2: 首屏区 (Hero Section & Terminal)
生成一个用于展示核心价值的巨大首屏，放在导航栏下方。
*   **Hero Container**：Width `1080px`, Auto Layout (Vertical, Align: Top Center), Padding: Top `120px`, Bottom `80px`, Gap `40px`。Fill `#FFFFFF`。
*   **Text Group (文案组)**：Auto Layout (Vertical, Align: Center), Gap `24px`。
    *   **主标题 (H1)**：文字 `Your Own AI Agents. Always On. Fully Isolated.`。字体 `Inter`, ExtraBold, `56px`, 色值 `#0F172A`，居中对齐，最大宽度 `800px`。
    *   **副标题 (Subtitle)**：文字 `A self-hosted, containerized agent platform with long-term memory, MCP support, and omnichannel connectivity. Zero telemetry. 100% yours.`。字体 `Inter`, Regular, `18px`, 色值 `#475569`，居中对齐，最大宽度 `720px`。
*   **Button Group (按钮组)**：Auto Layout (Horizontal), Gap `16px`。
    *   **Button 1**：Fill `#6366F1` (品牌紫)。Text: `Get Started (GitHub)` (白色)。Padding `12px 24px`, Radius `6px`。无阴影。
    *   **Button 2**：Fill `#0F172A` (近黑)。Text: `View Documentation` (白色)。Padding `12px 24px`, Radius `6px`。无阴影。
*   **【应用双态阴影】Terminal Card (终端卡片)**：
    *   Width `880px`, Height `400px`, Radius `12px`。Fill `#0F172A` (深色主题)。添加 Drop shadow (Y: 20, Blur: 40, Color: #000000 15%)。绝对禁止边框。
    *   **Terminal Header**：Height `48px`, Auto Layout (Horizontal, Align: Bottom), Padding: Left `16px`。Border: Bottom `1px Solid #1E293B`。
        *   **Tab 1**：Text `docker-compose.yml` (`Fira Code`, `13px`, `#64748B`)。Padding `8px 16px`。
        *   **Tab 2 (Active)**：Text `logs` (`Fira Code`, `13px`, `#FFFFFF`)。Padding `8px 16px`。背景色 `#000000` (代表选中态)，顶部有 `2px` 的白色高亮边框。
    *   **Terminal Body**：Padding `24px`。Auto Layout (Vertical), Gap `8px`。
        *   添加多行代码文字，模拟生成式 AI 输出，例如 `[INFO] Containerizing bot instance...`、`[SUCCESS] Hybrid memory (Dense+BM25) initialized.`、`[NET] Connected to Discord, Telegram, Lark.`。使用 `Fira Code`, `13px`。部分词汇用白色 `#FFFFFF`，其余用灰蓝色 `#94A3B8`。
        *   在最后一行文字末尾添加一个白色的方块实体 `█` 代表光标。

---

## 🧱 Module 3: 核心卖点网格 (The Virtual Computer Architecture)
首屏下方，用于展示 Memoh 的底层硬核技术。
*   **Section Container**：Width `1080px`, Auto Layout (Vertical, Align: Center), Padding: Top `80px`, Bottom `80px`, Gap `48px`。
*   **Section Header**：文字 `The Virtual Computer Architecture` (`Inter`, Bold, `32px`, `#0F172A`)。
*   **Grid System (三列无缝网格)**：
    *   **外层 Wrapper**：Width `880px` (Fill Container), Auto Layout (Horizontal), Gap `0px`。**注意：Gap 必须是 0**。添加外边框 `1px Solid #E2E8F0`，Radius `8px`。同时设置 Clip content。
    *   **Card 1 (Containerized Isolation)**：
        *   Width: Fill Container (等分)。Auto Layout (Vertical), Padding `48px 32px`, Gap `24px`。Border: Right `1px Solid #E2E8F0`。
        *   **图形区**：画 3 个重叠的极简细线正方体（1px 黑色描边，无填充），隐喻 `containerd` 沙盒。
        *   **标题**：`Containerized Isolation` (`Inter`, SemiBold, `18px`, `#0F172A`)。
        *   **正文**：`Every bot gets its own 'virtual computer' via containerd. Isolated filesystems, isolated networks. If a tool fails, the host is safe.` (`Inter`, Regular, `14px`, `#475569`)。
    *   **Card 2 (Advanced Memory Engineering)**：
        *   Width: Fill Container。Auto Layout (Vertical), Padding `48px 32px`, Gap `24px`。Border: Right `1px Solid #E2E8F0`。
        *   **图形区**：用 `Fira Code` 字体写一个极简的树状结构 `├── Built-in\n├── Mem0\n└── OpenViking`。
        *   **标题**：`Advanced Memory Engineering` (`Inter`, SemiBold, `18px`, `#0F172A`)。
        *   **正文**：`Pluggable hybrid retrieval (Dense + Sparse + BM25) with LLM-driven fact extraction. Bots maintain long-term recall autonomously.`。
    *   **Card 3 (Omnichannel Native)**：
        *   Width: Fill Container。Auto Layout (Vertical), Padding `48px 32px`, Gap `24px`。无右侧边框。
        *   **图形区 (Chat Skeleton)**：画一个极简的气泡轮廓（1px 边框，无底色，圆角 16px）。里面写上 `/slash commands`。气泡下方画 4 个直径 `24px` 的实心圆形 (`Fill: #E2E8F0`) 水平排列，代表 Telegram, Discord, Lark, WeChat 的 Logo 占位符。
        *   **标题**：`Omnichannel Native` (`Inter`, SemiBold, `18px`, `#0F172A`)。
        *   **正文**：`Native support for 9+ channels including Telegram, Discord, Lark, Matrix, WeChat, and Web UI. Deploy once, chat anywhere.`。

---

## 🧱 Module 4: 开发者原生能力 (Developer-First Capabilities)
展示 Multi-Bot 管理和 MCP 工具集成。
*   **Section Container**：Width `1080px`, Auto Layout (Vertical, Align: Center), Padding: Top `80px`, Bottom `80px`, Gap `48px`。背景色 Fill `#F8FAFC` (极浅灰，用于区分布局)。
*   **Section Header**：文字 `Developer-First by Design` (`Inter`, Bold, `32px`, `#0F172A`)。
*   **Capabilities Interface (巨大的一体化卡片)**：
    *   Width `880px`, Height `500px`。Auto Layout (Horizontal), Gap `0px`。Border `1px Solid #E2E8F0`, Radius `12px`, Fill `#FFFFFF`, Clip content。**无阴影**。
    *   **Left Sidebar (左侧导航, 宽度 240px)**：
        *   Auto Layout (Vertical), Padding `16px 0`, Border Right `1px Solid #E2E8F0`, Fill `#FFFFFF`。
        *   **Tab 1 (Active)**：Width Fill Container, Padding `16px 24px`。Fill `#0F172A`。文字 `Multi-Bot Dashboard` (`Fira Code`, `14px`, `#FFFFFF`)。
        *   **Tab 2 (Inactive)**：Padding `16px 24px`。文字 `Twilight AI SDK (Go)` (`Fira Code`, `14px`, `#64748B`)。
        *   **Tab 3 (Inactive)**：Padding `16px 24px`。文字 `MCP Tool Integration` (`Fira Code`, `14px`, `#64748B`)。
        *   **Tab 4 (Inactive)**：Padding `16px 24px`。文字 `Browser Automation` (`Fira Code`, `14px`, `#64748B`)。
    *   **Right Content (右侧展示区, Fill Container)**：
        *   Auto Layout (Vertical), Padding `32px`。Fill `#F1F5F9` (代码块背景)。
        *   **内容**：放置一段 JSON 代码。
            `{\n  "bot_id": "nexus-01",\n  "memory_engine": "OpenViking",\n  "mcp_tools": ["supermarket-search", "playwright-browser"],\n  "cron_jobs": ["0 9 * * * daily_briefing"]\n}`
        *   字体使用 `Fira Code`, `14px`, `#0F172A`。

---

## 🧱 Module 5: 社区生态表格 (Social Proof / Ecosystem Table)
展示 GitHub 相关生态的扁平表格。
*   **Section Container**：Width `1080px`, Auto Layout (Vertical, Align: Center), Padding: Top `80px`, Bottom `80px`, Gap `32px`。Fill `#FFFFFF`。
*   **Section Header**：文字 `Memoh Ecosystem` (`Inter`, SemiBold, `24px`, `#0F172A`)，左对齐 (相对于内部表格区域)。
*   **The Flat Table (纯扁平表格)**：
    *   Width `880px`, Auto Layout (Vertical)。Border `1px Solid #E2E8F0`, Radius `8px`。**无阴影**。
    *   **Row 1**: Auto Layout (Horizontal, Space between, Align Center), Padding `24px 32px`, Border Bottom `1px Solid #E2E8F0`。
        *   Left: 文字 `Memoh / Supermarket` (`Inter`, Medium, `16px`, `#0F172A`)。
        *   Right: 文字 `Official Skill & MCP Registry ->` (`Inter`, Regular, `14px`, `#64748B`)。
    *   **Row 2**: 同上布局，Border Bottom `1px Solid #E2E8F0`。
        *   Left: 文字 `Memoh / twilight-ai`。
        *   Right: 文字 `Lightweight AI SDK for Go ->`。
    *   **Row 3**: 同上布局，Border Bottom `1px Solid #E2E8F0`。
        *   Left: 文字 `Memoh / Autofish`。
        *   Right: 文字 `Android Device Automation Agent ->`。
    *   **Row 4**: 同上布局，**无**底部 Border。
        *   Left: 文字 `Memoh / acgo`。
        *   Right: 文字 `Apple Container SDK for Go ->`。

---

## 🧱 Module 6: 页脚终极转化 (Footer & Final CTA)
*   **Footer Container**：Width `1080px`, Auto Layout (Vertical, Align: Center), Padding `120px 100px 40px 100px`, Gap `64px`。
*   **Top Divider**：在 Footer 的最顶部画一条线，Width `1080px`, Height `1px`, Fill `#E2E8F0`。
*   **Call to Action 组 (居中)**：
    *   Auto Layout (Vertical, Align: Center), Gap `32px`。
    *   **H2**：文字 `Ready to spin up your agent network?` (`Inter`, Bold, `40px`, `#0F172A`)。
    *   **Primary Button (必须使用品牌紫)**：Fill `#6366F1`。Padding `16px 40px`, Radius `8px`。Text `Deploy in 5 minutes` (`Inter`, Bold, `16px`, `#FFFFFF`)。无阴影。
*   **Bottom Links (版权区)**：
    *   Width `880px` (Fill Container), Auto Layout (Horizontal, Space between, Align: Center)。
    *   **Left**：文字 `© 2026 MemohAI. Open Source.` (`Inter`, Regular, `14px`, `#94A3B8`)。
    *   **Right**：画两个大小为 `24px` 的纯灰色圆形占位符 (Fill: `#E2E8F0`)，代表 GitHub 和 Twitter 的 Logo。

---
> **给用户的温馨提示：** 如果一次性将所有 Module 粘贴给 Figma Make 导致其混乱或遗漏，**请严格按照 `Module 0 + Module 1`，然后选定画板继续添加 `Module 2` 的方式进行增量生成**。这份提示词已经详细到了每一个 Padding 数值、Gap 规则和边框有无，它能确保生成的界面呈现 100% 的极简极客风格，并且毫无遗漏地覆盖了所有的 GitHub 卖点。