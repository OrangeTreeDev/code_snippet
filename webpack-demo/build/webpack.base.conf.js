const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  context: path.resolve(__dirname, '../'), // absolute path for resolving entry and loaders cofig
  entry: {
    app: './client/app.js',
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json' ]
    // alias: {
    //   // vue-loader在构建阶段完成了模板编译工作，所以不需要引入vue的完整版
    //   'vue$': 'vue/dist/vue.esm.js'
    // }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    // asset management
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, '../client')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        }      
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // require the Babel runtime as separate module to avoid the duplication
              // And support dynamic import
              plugins: ['@babel/plugin-transform-runtime','@babel/plugin-syntax-dynamic-import']
            },
          },
        ],
      },
       // this will apply to both plain '.less' files
      // and '<style lang="less"></style> block in '.vue' file
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({ browsers: 'last 5 version' })
              ]
            }
          },
          'less-loader',
        ],
      },
      // this will apply to both plain '.css' files
      // and '<style></style> block in '.vue' file
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({ browsers: 'last 5 version' })
              ]
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          // inline a file as base-64 data url if they are small
          // or fall back to file-loader, file-loader can name file for better caching
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]',
            },
          },
        ],
     },
    ],
  },
  plugins: [
    // copy any other rules and apply them to the '.vue' file
    new VueLoaderPlugin()
  ],
};