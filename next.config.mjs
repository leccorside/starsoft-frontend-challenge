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
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com',
        pathname: '/items/**',
      },
    ],
  },
};

export default nextConfig;
