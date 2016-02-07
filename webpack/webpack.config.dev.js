/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:53:23
 * @version $Id$
 */

var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index'
  ],
  output: {
    path: path.join(__dirname, '..', '/client/dist'),
    filename: 'js/bundle.js',
    publicPath: '//localhost:8088/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new htmlWebpackPlugin({
        title: 'ZBlog',
        filename: 'index.html',
        template: './client/src/index.template.html',
        favicon: './server/assets/favicon.ico'
    }),
    new CleanPlugin(['client/dist'], {
      root: process.cwd(),
      verbose: true,
      dry: false
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: path.join(__dirname, '..', '/client/src')
        }]
  }
} 

