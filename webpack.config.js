var path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    onblock : path.resolve(__dirname, './index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    library: 'OnBlock',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader'
      },
    ]
  },
};