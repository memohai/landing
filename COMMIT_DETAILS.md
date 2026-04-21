# Commit Details - Memoh Landing Page Refinement

This commit includes several UI refinements, code cleanups, and configuration updates to improve the landing page's visual consistency and development experience.

## Changes Summary

### 1. UI Refinements & Consistency
- **Redundancy Cleanup**: Removed explicit `bg-background` and `text-foreground` classes from several main sections (`App.vue`, `HeroSection.vue`, `InstallModule.vue`). These are already handled by the global layout or theme system, and removing them ensures better consistency with the background canvas.
- **Ecosystem Section Enhancements**:
  - Updated hover states for ecosystem links to use a more subtle `bg-primary/5` instead of the generic `bg-accent`.
  - Added dynamic hover effects to service icons, including color transitions to the primary brand color and soft background highlights.

### 2. Code Optimization
- **`BackgroundCanvas.vue`**: 
  - Removed unused `useThrottleFn` import.
  - Simplified the `updateColor` function by removing unused logic that attempted to read CSS variables manually.
- **General**: Improved transition and interaction logic in the ecosystem component.

### 3. Development Configuration
- **`vite.config.ts`**: Configured the Vite server to listen on all network interfaces (`host: true`), facilitating easier local network testing and mobile preview.

## Verification
- Verified theme switching (Dark/Light mode) still works correctly after removing redundant background classes.
- Confirmed background canvas visibility and interaction remain smooth.
- Tested hover states in the Ecosystem section across different screen sizes.
