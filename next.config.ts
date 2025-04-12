/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pixabay.com'], 
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;