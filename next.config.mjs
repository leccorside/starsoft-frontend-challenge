/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starsoft-challenge-7dfd4a56a575.herokuapp.com',
        pathname: '/v1/products/**',
      },
    ],
  },
};

export default nextConfig;
