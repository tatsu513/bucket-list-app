const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false,
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
});
