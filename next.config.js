/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  env: {
    API_END_POINT: process.env.API_END_POINT,
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
