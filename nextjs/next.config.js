/** Minimal Next.js config created by conversion script */
const path = require('path');
module.exports = {
  reactStrictMode: true,
  // Allow importing from workspace root (useful for reading `.agent`)
  webpack: (config) => {
    config.resolve.alias['@root'] = path.resolve(__dirname);
    return config;
  },
};