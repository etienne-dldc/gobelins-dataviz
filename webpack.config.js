'use strict';

var webpack = require('webpack');
var path = require("path");

var config = require('./config');

var webpackConfig = {
  debug: true,
  devtool: 'eval',
  entry: config.entryPoint,
  output: {
    path: path.join(__dirname, config.out),
    publicPath: config.publicPath,
    filename: config.outFile
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /src\/(three|modules)\/.*(\.js)$/,
        loader: 'babel'
      },
      {
        test: /src\/styles\/.*(\.scss)$/,
        loader: 'sass'
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      },
      {
        test: /\.(svg|eot|woff2|woff|ttf)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}

module.exports = webpackConfig
