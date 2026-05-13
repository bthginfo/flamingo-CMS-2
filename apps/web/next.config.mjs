/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@flamingo/cms-core",
    "@flamingo/db",
    "@flamingo/funding",
    "@flamingo/sections",
    "@flamingo/shared"
  ],
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
