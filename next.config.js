/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: 'service-worker.js',
  sw: 'arc-sw.js',
  fallbacks: {
    
  },
  cacheOnFrontEndNav: true,
  mode: 'production'
});

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  api: {
    responseLimit: false,
    externalResolver: true,
    bodyParser: false,
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      }
    ]
  },
  async rewrites() {
    return [
      
    ]
  },
});

module.exports = nextConfig;
