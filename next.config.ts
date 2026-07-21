import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/sets", destination: "/en/sets", permanent: true },
      { source: "/sets/:path*", destination: "/en/sets/:path*", permanent: true },
      { source: "/methodology", destination: "/en/methodology", permanent: true },
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
      { source: "/sources", destination: "/en/sources", permanent: true },
      { source: "/terms", destination: "/en/terms", permanent: true },
      { source: "/privacy", destination: "/en/privacy", permanent: true },
      { source: "/guides/:path*", destination: "/en/guides/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
