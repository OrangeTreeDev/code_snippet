const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '../dist'
  },
  plugins: [
    // inject bundle into html file
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../client/index.html'),
      minify: false,
    }),
  ]
});

module.exports = devWebpackConfig;
