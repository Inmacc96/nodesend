/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    backendURL: "http://localhost:4000/api/",
  },
};

module.exports = nextConfig;
