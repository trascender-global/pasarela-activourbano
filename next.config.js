/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    wompiPublicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
    wompiApiUrl: process.env.NEXT_PUBLIC_WOMPI_API_URL,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
  },
};

module.exports = nextConfig;
