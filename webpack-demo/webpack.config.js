const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // 非入口chunk的bundle名
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'production',
  // optimization: {
  //   usedExports: true
  // }
};
