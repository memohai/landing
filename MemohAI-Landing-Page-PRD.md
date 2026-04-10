# MemohAI Landing Page – Design Requirements Document (PRD)

Based on the core features of the Memoh repository and the strict architectural guidelines from your design system (`@Design-new.md`), here is the comprehensive Landing Page Design PRD.

## 1. Product Overview & Positioning
**Memoh** is a self-hosted, always-on AI agent platform. It enables users to deploy multi-member, containerized AI bots with long-term memory that integrate seamlessly with channels like Telegram, Discord, Lark, and a built-in Web UI. 

**Target Audience:** Developers, self-hosters, home-lab enthusiasts, and productivity power users who value privacy, control, and "always-on" AI continuity.
**Core Vibe:** Technical, Precise, Direct, Minimal, "Developer-First." 

---

## 2. Design System & Theming (Strict Adherence)
The landing page must strictly follow the **Memoh Design System (The 5 Absolute Laws)**:

*   **Style:** Flat Design (2D, no gradients, clean lines, minimal icons).
*   **The "Flat Atom" Law:** Zero base shadows. Cards, inputs, and buttons use `shadow-none` and rely strictly on `border-border` (1px crisp dividers) and background contrast.
*   **Bimodal Elevation:** The canvas is completely flat. Strong shadows (`shadow-md`, `shadow-lg`) are **only** used for floating elements (e.g., sticky navigation, dropdowns, floating video demos).
*   **Color Palette (Monochrome + Purple Scarcity - Extended to 15%):**
    *   **Background:** Pure White (`bg-background`).
    *   **Foreground:** Near Black (`bg-foreground`) for primary structural buttons and text.
    *   **Muted:** Light Gray (`bg-muted`/`bg-accent`) for secondary panels, code blocks, and hover states.
    *   **Brand Purple (`bg-primary`):** *Controlled Scarcity (15% limit)*. Used for the primary CTAs in the Hero, Sticky Nav, and Footer. Do not use purple for decorative backgrounds.
*   **Dark Mode (Inversion Strategy):** 
    *   **Background:** Premium dark gray (`#121212`), absolutely never pure black (`#000000`).
    *   **Borders:** "Ghost lines" — very subtle but legible border colors (e.g., `#2E2E2E`) that provide structure without being visually intrusive.
*   **Typography & Spacing:** 
    *   **Headers & Body:** Crisp `font-sans` (e.g., Inter, Geist, or Fira Sans).
    *   **Technical/Code Elements:** `font-mono` (e.g., Fira Code) to emphasize the developer-friendly nature of the stack.
    *   Base `text-sm` (14px), secondary `text-xs` (12px).
    *   **Padding Strategy:** Employ extremely generous padding (`p-8`, `p-12`, 32px-48px) within cards. Let the whitespace itself act as a structural element, contrasting the dense technical content with luxurious, breathable layouts.

---

## 3. Page Structure & Layout (Pattern: Minimal & Direct + Demo)

### A. Hero Section (Above the Fold)
*Goal: Immediate technical validation and high-conversion CTA.*
*   **Headline:** "Your Own AI Agents. Always On. Fully Isolated."
*   **Sub-headline:** "A self-hosted, containerized agent platform with long-term memory, MCP support, and omnichannel connectivity. Zero telemetry. 100% yours."
*   **CTAs (Monochrome vs. Purple Scarcity):**
    *   **Primary CTA:** `bg-primary` (Purple) - "Get Started (GitHub)"
    *   **Secondary CTA:** `bg-foreground` (Near Black) - "View Documentation"
*   **Visual Element:** A high-contrast, bimodal floating element (`shadow-lg`). An interactive terminal window (`bg-accent`, `font-mono`) allowing users to switch between tabs (e.g., `docker-compose`, `logs`). 
    *   *Tab Interaction:* Tab switching follows the `@design-new.md` `Selected` law (`data-[state=checked]:bg-foreground aria-checked="true"`), meaning the active tab background turns completely dark, with white text. No displacement or underlines.

### B. "The Virtual Computer" (Core USP Showcase)
*Goal: Explain containerization and isolation visually.*
*   **Layout:** 1px `border-border` grid system. Flat cards. 
    *   *Responsive Strategy:* On desktop, displays as a full 2D grid. On mobile (375px), vertical outer borders are removed, leaving only horizontal dividers (`border-b border-border`) to form a clean vertical list.
*   **Visual:** Abstract, geometric representation of isolated containers.
*   **Copy/Feature Highlights:**
    1.  **Containerized Isolation:** "Every bot gets its own 'virtual computer' via `containerd`. Isolated filesystems, isolated networks. If a tool fails, the host is safe."
    2.  **Advanced Memory Engineering:** "Pluggable hybrid retrieval (Dense + Sparse + BM25) with LLM-driven fact extraction."
    3.  **Omnichannel Native:** "Discord, Telegram, Lark, Matrix, WeChat. Deploy once, chat anywhere."
        *   *Visual Presentation:* A minimalist "Chat UI Skeleton" displaying typing animations. The typed text contains platform-specific terminology (e.g., "/slash commands" for Telegram, "@mention" for Discord) to imply cross-platform support. Accompanying this skeleton is a reserved space for a monochromatic array of platform logo outlines (pure black/white SVG).

### C. Developer-First Capabilities (Interactive Code/Config Block)
*Goal: Prove it's built for power users without the setup hassle.*
*   **Interactive Tabs:** Use standard hover states (`bg-accent text-foreground`).
*   **Content:** Show how easy it is to configure via the visual dashboard vs. YAML.
    *   *Tab 1: Visual Dashboard* (Screenshot of Vue 3/Tailwind UI with a 1px border).
    *   *Tab 2: Twilight AI SDK* (Snippet of Go code showing streaming/tool-calling).
    *   *Tab 3: MCP Tools* (Showing standard JSON config for connecting external tools).

### D. Social Proof / Community (Flat Table List)
*Goal: Show momentum and ecosystem.*
*   **Design:** A flat table (`border-border rounded-sm shadow-none`) listing supported integrations (Supermarket skills, OpenViking memory, etc.). Hovering over a row applies `bg-accent`.

### E. Footer CTA
*   **Design:** Clean, 1px top border.
*   **Headline:** "Ready to spin up your agent network?"
*   **CTA:** Single, highly visible `bg-primary` button. "Deploy in 5 minutes".

---

## 4. Interaction & UX Guidelines (a11y First)
*   **Hover States (Monochrome Hover Law):** Buttons and cards shift to `bg-accent text-foreground`. Absolutely NO spatial displacement (`translate`, `scale`, or `margin` shifts) on hover to maintain the strict flat machine-like aesthetic. Only use color and opacity shifts (`transition-colors duration-[200ms]`).
*   **Focus States:** All interactive elements must implement `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
*   **Cursor:** Add `cursor-pointer` to all clickable elements.
*   **Transitions:** Fast, technical feel. `transition-colors duration-[150ms]`.

---

## 5. Motion & Animation (The "Performance" Rules)
*All animations must strictly respect the `prefers-reduced-motion` media query.*

### A. The "Boot Sequence" (Initial Load)
*Goal: Deliver a high-impact, technical "performance" while maintaining usability.*
*   **Entry Animation:** A highly choreographed, terminal-inspired "Sequential Line-by-Line Render." Elements (typography, 1px grid lines) render rapidly from top to bottom with extremely short intervals (e.g., 30-50ms stagger), mimicking a fast CI/CD deployment log or system boot.
*   **The Kill Switch:** A prominent but visually restrained, absolute-positioned toggle placed at the highest Z-index in the top navigation. It should be a minimalist text/ghost button (e.g., `[Skip Intro]` or `[Motion: ON/OFF]`) using a muted background (`bg-muted`) and standard foreground text, relying on position rather than the brand purple for its high priority. Clicking this immediately aborts the entry sequence, rendering the page instantly, and disables all subsequent ambient animations.

### B. Ambient State: "Always-On"
*Goal: Subtly communicate persistent container activity without distracting from content.*
*   **Data Pulse (Grid Lines):** In the negative space (the large padding areas) of the 1px grid system, implement a highly subtle "data pulse." Specific horizontal or vertical 1px line segments briefly increase in opacity/brightness for ~150ms before returning to their base state, traversing the grid like data packets in a network. *Strictly Monochromatic:* The pulse must use base shades (e.g., in Dark Mode, a `#2E2E2E` line pulsing to `#FFFFFF`). Do NOT use the brand purple for this effect; maintain the machine-like, neutral aesthetic.
*   **The Heartbeat:** A persistent, classic terminal block cursor (`█`) blinking at a steady 800ms interval within the Hero terminal component and near key headers, serving as the system's quiet heartbeat.

### C. Interaction Transitions
*Goal: Balance machine-like speed with visual comfort, leaning into the "Generative AI" identity.*
*   **Hero Terminal Output (Generative Effect):** When switching tabs in the main terminal (e.g., to `logs`), avoid traditional typewriter effects. Instead, reveal the new code/log output via a "Block-by-Block Illumination" sequence. Sections of the text light up in quick succession (mimicking the token-by-token generation of an LLM), providing a fast, "Generative AI" feel without the slowness of letter-by-letter typing.
*   **General UI Tab Switching:** For non-terminal UI tabs, use a "Hard Crossfade"—a brutally fast opacity transition (`duration-[75ms]` or `duration-[100ms]`). This prevents jarring visual jumps while preserving the feeling of immediate, unyielding responsiveness.

## 6. Pre-Delivery Developer Checklist
- [ ] UI is built using shadcn/ui + Tailwind CSS.
- [ ] No emojis used as icons; strictly use crisp SVGs (e.g., Lucide).
- [ ] `bg-primary` (Purple) is counted. If it appears more than 3-4 times on the entire page, it's being overused.
- [ ] No gradients or soft drop-shadows on canvas elements. 
- [ ] Contrast ratios checked for light mode (text contrast 4.5:1 minimum).
- [ ] Mobile responsive (375px) without horizontal scrolling.