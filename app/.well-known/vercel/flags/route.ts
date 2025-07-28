import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next"
import * as flags from "@/flags"

// This endpoint allows the Vercel Toolbar to discover the feature flags
// defined in your application. It's a crucial part of the integration.
export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags)
})
