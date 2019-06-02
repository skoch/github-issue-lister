const withSass = require('@zeit/next-sass');
const dotenv = require('dotenv');

const path = './config/.env';
dotenv.config({ path });

console.log('Loading ', path);

module.exports = withSass({
  target: 'serverless',
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]--[hash:base64:5]',
  },
});
