import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://arday-bile-fullstack-app.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
