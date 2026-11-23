import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.vacationstomorocco.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vacationstomorocco.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.vacationstomorocco.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;