/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
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
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bare/:path*',
        destination: '/api/bare/:path*',
      },
      {
        source: '/gfiles/:path*',
        destination: 'https://binbashbanana.github.io/gfiles/gfiles/:path*'
      }
    ]
  },
});

module.exports = nextConfig;
