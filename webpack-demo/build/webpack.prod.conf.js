
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    // clean your build folder
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
  ]
});

module.exports = prodWebpackConfig;
