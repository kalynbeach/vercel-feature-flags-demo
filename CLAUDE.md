# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 demo application showcasing Vercel's feature flags functionality. The app demonstrates dynamic UI control through server-side feature flag evaluation.

## Development Commands

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Start production server
bun start

# Run linter
bun lint
```

## Architecture & Key Concepts

### Feature Flags System
The core feature flag implementation lives in `flags.ts`. When working with feature flags:
- Flags are defined using the `@vercel/flags/next` package
- Each flag has a key, description, and resolve function
- Flags are evaluated server-side in the app router
- The `decide()` function returns random values for demo purposes

### Component Structure
- All UI components are from shadcn/ui and live in `components/ui/`
- Components use CSS variables for theming (defined in `globals.css`)
- The `cn()` utility in `lib/utils.ts` handles className merging
- Dark mode is supported via `theme-provider.tsx`

### Next.js App Router
- Pages use server components by default
- Feature flags are awaited at the top of page components
- The `unstable_noStore()` cache directive ensures fresh flag values

## Working with Feature Flags

When adding new feature flags:
1. Define the flag in `flags.ts` with a unique key
2. Implement the resolve function (replace random logic with actual business logic)
3. Use the flag in server components by awaiting it
4. Pass flag values as props to client components if needed

Example:
```typescript
export const myNewFlag = flag<boolean>({
  key: 'my-new-flag',
  description: 'Controls new feature visibility',
  defaultValue: false,
  async resolve() {
    // Implement actual resolution logic here
    return decide(50);
  }
});
```

## UI Development

When creating or modifying UI:
- Use existing shadcn/ui components from `components/ui/`
- Follow the established pattern of CSS variables for colors
- Maintain responsive design with Tailwind's utility classes
- Keep component styling consistent with the existing design system

## Important Notes

- The project uses Bun as the package manager and runtime
- TypeScript strict mode is enabled
- Build errors are currently ignored for rapid prototyping
- No test suite exists yet
- The `@sveltejs/kit` dependency appears to be unused and can likely be removed