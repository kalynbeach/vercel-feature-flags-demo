# Vercel Feature Flags Demo

## Overview

This app is based on Vercel's [Flags SDK](https://github.com/vercel/flags) and demonstrates various feature flag examples.

See [Documentation & Resources](#documentation--resources) below for more info on the Flags SDK.

### Feature Flag Code

- **`flags.ts`**: Core module where feature flag functions are declared.
- **`app/page.tsx`**: Page with example usage of feature flag functions from `flags.ts`
- **`app/.well-known/vercel/flags/route.ts`**: Endpoint for feature flag discovery (by Vercel Toolbar)

### Vercel Toolbar

The **Vercel Toolbar** and its **Flags Explorer** feature is closely tied to Vercel's **Flags SDK** and provides a configurable UI for working with feature flags in various environments (dev, preview, prod, etc.)

## Usage

Install deps:

```bash
bun i
# or `npm install`
```

Run development server:

```bash
bun run dev
# or `npm run dev`
```

Build:

```bash
bun run build
# or `npm run build`
```

Serve production build:

```bash
bun run start
# or `npm run start`
```

## Documentation & Resources

Vercel Documentation:
- [Flags SDK](https://flags-sdk.dev/)
  - [Flags SDK - Principles - Flags as Code](https://flags-sdk.dev/principles/flags-as-code)
  - ⭐️ [Flags SDK - Principles - Precompute](https://flags-sdk.dev/principles/precompute)
  - [Flags SDK - Principles - Evaluation Context](https://flags-sdk.dev/principles/evaluation-context)
  - ⭐️ [Flags SDK - Frameworks - Quickstart](https://flags-sdk.dev/frameworks/next)
  - ⭐️ [Flags SDK - Frameworks - Precompute](https://flags-sdk.dev/frameworks/next/precompute)
- [Feature Flags](https://vercel.com/docs/feature-flags)
- [Flags Explorer](https://vercel.com/docs/feature-flags/flags-explorer)
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar)

Local markdown documents in `docs/` (for LLM context, as needed):
- [feature-flags.md](docs/vercel/feature-flags.md)
- [flags-explorer-getting-started.md](docs/vercel/flags-explorer-getting-started.md)
- [flags-explorer-reference.md](docs/vercel/flags-explorer-reference.md)

---

## v0

> **This is the initial README content from v0**

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/kalynbeach/v0-vercel-feature-flags-demo)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/d1VohooKCOi)

### Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

### Deployment

Your project is live at:

**[https://vercel.com/kalynbeach/v0-vercel-feature-flags-demo](https://vercel.com/kalynbeach/v0-vercel-feature-flags-demo)**

### Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/d1VohooKCOi](https://v0.dev/chat/projects/d1VohooKCOi)**

### How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository