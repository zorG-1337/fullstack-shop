/** @type {import('next').NextConfig} */
const nextConfig = {
    env: { // Конфигурация env?
        APP_ENV: process.env.APP_ENV,
        APP_URL: process.env.app_URL,
        APP_DOMAIN: process.env.APP_DOMAIN,
        SERVER_URL: process.env.SERVER_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.yandex.net'

            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.SERVER_URL}/uploads/:path*`
            }
        ]
    }
};

export default nextConfig;
