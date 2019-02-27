
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpackConfig = require('./webpack.base.conf');

const prodWebpackConfig = merge(baseWebpackConfig, {
  // use built-in optimizations
  // enable DefinePlugin, TerserPlugin
  mode: 'production',
  // debugging as well as running benchmark tests
  devtool: 'source-map',
  optimization: {
    // split chunk
    splitChunks: {
      cacheGroups: {
        // split duplicated dependencies into a new chunks
        commons: {
          chunks: 'all',
          minChunks: 2
        },
        // split core module into a new chunks
        vendors: {
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)/,
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single',
    // avoid duplicated dependencies and 
    // To minify the output
    minimizer: [
      // drop dead code and minify js
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    // clean your build folder
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    /* create a CSS file per JS bundle which contains CSS
     * then the CSS bundle is loaded in parallel to the JS bundle(inclue dynamic import bundle)
     */
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    // inject bundle into html file
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../client/index.html'),
      // if set minify is true or set mode as production, dose not work
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      chunksSortMode: 'dependency'
    }),
  ]
});

module.exports = prodWebpackConfig;
