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
  }
};

export default nextConfig;
