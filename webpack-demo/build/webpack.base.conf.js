const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: path.resolve(__dirname, '../'), // absolute path for resolving entry and loaders cofig
  entry: {
    app: './client/app.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js'
  },
  // module: {
  //   // asset management
  //   rules: [
  //     {
  //       test: /\.vue$/,
  //       loader: 'vue-loader'
  //     },
  //     // this will apply to both plain '.less' files
  //     // and '<style lang="less"></style> block in '.vue' file
  //     // {
  //     //   test: /\.less$/,
  //     //   use: [
  //     //     'style-loader',
  //     //     'css-loader',
  //     //     'less-loader',
  //     //   ],
  //     // },
  //     {
  //       test: /\.css$/,
  //       use: [
  //         'vue-style-loader',
  //         'css-loader'
  //       ],
  //     },
  //     // {
  //     //   test: /\.js$/,
  //     //   exclude: /node_modules/,
  //     //   use: [
  //     //     {
  //     //       loader: 'babel-loader',
  //     //       options: {
  //     //         presets: ['@babel/preset-env'],
  //     //         plugins: ['@babel/plugin-transform-runtime']
  //     //       },
  //     //     },
  //     //   ],
  //     // },
  //   //   {
  //   //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //   //     use: [
  //   //       // inline a file as base-64 data url if they are small
  //   //       // or fall back to file-loader, file-loader can name file for better caching
  //   //       {
  //   //         loader: 'url-loader',
  //   //         options: {
  //   //           limit: 10000,
  //   //           name: 'img/[name].[hash:7].[ext]',
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  //   //     use: [
  //   //       {
  //   //         loader: 'url-loader',
  //   //         options: {
  //   //           limit: 10000,
  //   //           name: 'media/[name].[hash:7].[ext]',
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  //   //     use: [
  //   //       {
  //   //         loader: 'url-loader',
  //   //         options: {
  //   //           limit: 10000,
  //   //           name: 'fonts/[name].[hash:7].[ext]',
  //   //         },
  //   //       },
  //   //     ],
  //   //
  //   //  },
  //   ],
  // },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // copy any other rules and apply them to the '.vue' file
    new VueLoaderPlugin(),
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
    }),
  ],
};