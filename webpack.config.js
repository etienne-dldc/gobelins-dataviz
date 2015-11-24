'use strict';

var webpack = require('webpack');
var path = require("path");

var webpackConfig = {
  debug: true,
  devtool: 'eval',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  plugins: []
}

module.exports = webpackConfig
