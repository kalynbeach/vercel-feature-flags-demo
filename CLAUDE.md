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

## Key Dependencies

- **Feature Flags** (`flags`) - Core feature flags package for Next.js
- **Vercel Toolbar** (`@vercel/toolbar`) - Integrated for development and production debugging
- **Tailwind CSS v4** - Using CSS imports with @theme inline syntax
- **ESLint** - Configured with `eslint-config-next` using flat config format

## Architecture & Key Concepts

### Feature Flags System
The core feature flag implementation lives in `flags.ts`. When working with feature flags:
- Flags are defined using the `"flags/next"` package
- Each flag has a key, description, options array, and decide function
- Flags are evaluated server-side in the app router
- The `decide()` function returns values using custom logic (random selection for demo purposes)

### Component Structure
- UI components from shadcn/ui live in `components/ui/` (including sidebar, chart components)
- Components use CSS variables for theming (defined in `app/globals.css`)
- The `cn()` utility in `lib/utils.ts` handles className merging
- Dark mode is supported via `theme-provider.tsx`
- Custom hooks in `hooks/` directory (`use-toast.ts`)

### Next.js App Router
- Pages use server components by default
- Feature flags are awaited at the top of page components

## Working with Feature Flags

When adding new feature flags:
1. Define the flag in `flags.ts` with a unique key
2. Add options array with possible values and labels
3. Use the flag in server components by awaiting it
4. Pass flag values as props to client components if needed

Example:
```typescript
export const myNewFlag = flag<boolean>({
  key: 'my-new-flag',
  description: 'Controls new feature visibility',
  defaultValue: false,
  options: [
    { value: true, label: "Enable" },
    { value: false, label: "Disable" },
  ],
  decide: () => Math.random() > 0.5,
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
- No test suite exists yet
- Tailwind CSS v4 is configured using CSS imports instead of a config file

## Configuration Files

- **ESLint**: Configured in `eslint.config.mjs` using flat config format
- **Prettier**: Configuration embedded in `package.json`
- **Vercel Toolbar**: Integrated via `withVercelToolbar` in `next.config.ts`

## Additional Resources

- Feature flags documentation available in `/docs/vercel/` directory
- Vercel Toolbar is injected in development mode and can be enabled in production