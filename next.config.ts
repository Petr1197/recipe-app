import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'edamam-product-images.s3.amazonaws.com',
        },
      ],
    },
  }


export default nextConfig;
