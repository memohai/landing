# Memoh Landing Page

Welcome to the **Memoh Landing Page** project! This repository contains the frontend scaffold for Memoh's landing page, engineered for high performance, accessibility, and a modern, AI-centric aesthetic.

## ✨ Features & Design

Inspired by Memoh's clean and modern interface, this landing page incorporates:
- **Modern UI/UX**: Clean interfaces with Dark/Light mode support, utilizing Action Blue/Indigo and modern AI gradients.
- **Layout Patterns**: Features split-layout hero sections and bento-box style grids for presenting features.
- **Accessible Components**: Built on top of Radix Vue for fully accessible, interactive primitives (e.g., accordions, dialogs, tooltips).
- **Mobile-First Responsive Design**: Fluid and responsive layouts powered by Tailwind CSS.

## 🛠 Technical Stack

This project leverages a robust, modern frontend architecture based on the `memohai/Memoh` core repository:

- **Framework**: Vue 3 (Composition API & `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS (with CSS Variables integration)
- **UI Primitives**: Radix Vue (Reka UI)
- **Icons**: Lucide Vue Next

## 📂 Project Structure

```text
src/
├── assets/      # Static assets and global CSS styles
├── components/  # Atomic, reusable UI components and page sections
├── store/       # Pinia stores for state management
├── App.vue      # Root application component
└── main.ts      # Application entry point
```

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and `npm` installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/memohai/Memoh.git
   ```
2. Navigate to the landing page directory and install the dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Build for Production

Create a production-ready, minified build:
```bash
npm run build
```
