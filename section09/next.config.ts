import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "shopping-phinf.pstatic.net",
  //       port: "",
  //       pathname: "/**",
  //     },
  //   ],
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "shopping-phinf.pstatic.net",
  //     },
  //   ],
  // },
};

export default nextConfig;
