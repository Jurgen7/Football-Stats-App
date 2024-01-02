/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'media.api-sports.io' },
        ],
    },
}

module.exports = nextConfig;
