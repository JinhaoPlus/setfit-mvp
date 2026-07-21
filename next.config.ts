import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/sets", destination: "/en/sets", permanent: true },
      { source: "/sets/:path*", destination: "/en/sets/:path*", permanent: true },
      { source: "/methodology", destination: "/en/methodology", permanent: true },
      { source: "/privacy", destination: "/en/privacy", permanent: true },
      { source: "/guides/:path*", destination: "/en/guides/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
