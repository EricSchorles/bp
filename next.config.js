/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: { ignoreDuringBuilds: false },
    experimental: {
        appDir: true
    }
}

module.exports = nextConfig
