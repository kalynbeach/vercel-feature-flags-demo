import type { NextConfig } from "next";
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfigWithToolbar = withVercelToolbar({
  enableInProduction: true,
});

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfigWithToolbar(nextConfig); 