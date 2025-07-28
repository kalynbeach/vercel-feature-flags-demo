# Feature Flags

Feature flags are a powerful tool that allows you to control the visibility of features in your application, enabling you to ship, test, and experiment with confidence. Vercel offers various options to integrate feature flags into your application.

## [Choose how you work with flags](#choose-how-you-work-with-flags)

Vercel provides a flexible approach to working with flags, allowing you to tailor the process to your team's workflow at any stage of the lifecycle. The options can be used independently or in combination, depending on the project's needs. You can:

*   [Implement flags as code](#implementing-feature-flags-in-your-codebase), using the [Flags SDK](/docs/feature-flags/feature-flags-pattern) in Next.js or SvelteKit, or use an SDK from your existing feature flag provider.
*   [Manage feature flags](#managing-feature-flags-from-the-toolbar) through the Vercel Toolbar to view, override, and share your application's feature flags.
*   [Observe your flags](#observing-your-flags) using Vercel's observability features.
*   [Optimize your feature flags](#optimizing-your-feature-flags) by using an [Edge Config integration](/docs/edge-config/integrations).

### [Implementing Feature Flags in your codebase](#implementing-feature-flags-in-your-codebase)

If you're using Next.js or SvelteKit for your application, you can implement feature flags directly in your codebase. In Next.js, this includes using feature flags for static pages by generating multiple variants and routing between them with middleware.

*   Vercel is compatible with any feature flag provider including [LaunchDarkly](https://launchdarkly.com/), [Optimizely](https://www.optimizely.com/), [Statsig](https://statsig.com/), [Hypertune](https://www.hypertune.com/), [Split](https://www.split.io/), and custom feature flag setups.
*   [Flags SDK](/docs/feature-flags/feature-flags-pattern): A free open-source library that gives you the tools you need to use feature flags in Next.js and SvelteKit applications

### [Managing Feature Flags from the Toolbar](#managing-feature-flags-from-the-toolbar)

Flags Explorer is available on [all plans](/docs/plans)

Using the [Vercel Toolbar](/docs/vercel-toolbar), you're able to view, override, and share feature flags for your application without leaving your browser tab.

You can manage feature flags from the toolbar in any development environment that your team has [enabled the toolbar for](/docs/vercel-toolbar/in-production-and-localhost). This includes local development, preview deployments, and production deployments.

*   [Using Feature Flags in the Vercel Toolbar](/docs/feature-flags/flags-explorer): Learn how to view and override your application's feature flags from the Vercel Toolbar.
*   [Implementing Feature Flags in the Vercel Toolbar](/docs/feature-flags/flags-explorer/getting-started): Learn how to set up the Vercel Toolbar so you can see and override your application's feature flags.

### [Observing your flags](#observing-your-flags)

Web Analytics are available on [all plans](/docs/plans)

Feature flags play a crucial role in the software development lifecycle, enabling safe feature rollouts, experimentation, and A/B testing. When you integrate your feature flags with the Vercel platform, you can improve your application by using Vercel's observability features.

*   [Integrate Feature Flags with Runtime Logs](/docs/feature-flags/integrate-with-runtime-logs): Learn how to send feature flag data to Vercel logs.
*   [Integrate Feature Flags with Web Analytics](/docs/feature-flags/integrate-with-web-analytics): Learn how to tag your page views and custom events with feature flags.

### [Optimizing your feature flags](#optimizing-your-feature-flags)

Edge Config is available on [all plans](/docs/plans)

An Edge Config is a global data store that enables experimentation with feature flags, A/B testing, critical redirects, and IP blocking. It enables you to read data at the edge without querying an external database or hitting upstream servers. With [Vercel Integrations](/docs/integrations), you can connect with external providers to synchronize their flags into your Edge Config.

With Vercel's optimizations, you can read Edge Config data at negligible latency. The vast majority of your reads will complete within 15ms at P99, or often less than 1ms.

*   [Vercel Edge Config](/docs/edge-config): Experiment with A/B testing by storing feature flags in your Edge Config.
*   [Vercel Edge Config Quickstart](/docs/edge-config/get-started): Get started with reading data from Edge Config.

Last updated on June 2, 2025