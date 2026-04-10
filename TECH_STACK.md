# Technical Stack Environment

This project is a scaffold for the Memoh Landing Page, based on the `memohai/Memoh` repository's frontend architecture.

## Core Framework & Tools
- **Framework:** [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Language:** TypeScript
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Package Manager:** npm

## UI & Styling
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Primitives:** [Radix Vue](https://www.radix-vue.com/) (Reka UI)
- **Icons:** [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next)
- **Theming:** CSS Variables with Tailwind integration (Dark/Light mode support)

## Dependencies Summary
- `vue`: ^3.5.13
- `pinia`: ^3.0.1
- `radix-vue`: ^1.9.15
- `lucide-vue-next`: ^0.479.0
- `tailwindcss`: ^4.0.0 (or latest stable)
- `typescript`: ^5.7.2

## Folder Structure
- `src/components`: UI components and page sections.
- `src/store`: Pinia stores for state management.
- `src/assets`: Static assets and global styles (CSS).
- `src/App.vue`: Root application component.
- `src/main.ts`: Entry point.
