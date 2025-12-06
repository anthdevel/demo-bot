import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(process.cwd())
    };

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.[jt]sx?$/] },
      use: [
        {
          loader: "@svgr/webpack"
        }
      ]
    });

    return config;
  }
};

export default nextConfig;
