import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/tools/pdf",
        destination: "/pdf",
        permanent: true,
      },
      {
        source: "/tools/qrcode",
        destination: "/qrcode",
        permanent: true,
      },
      {
        source: "/tools/jwt-decoder",
        destination: "/jwt-decoder",
        permanent: true,
      },
      {
        source: "/tools/diff-checker",
        destination: "/diff-checker",
        permanent: true,
      },
      {
        source: "/tools/text-count",
        destination: "/text-count",
        permanent: true,
      },
      {
        source: "/tools/encode",
        destination: "/encode",
        permanent: true,
      },
      {
        source: "/tools/image",
        destination: "/image",
        permanent: true,
      },
      {
        source: "/tools/timestamp",
        destination: "/timestamp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
