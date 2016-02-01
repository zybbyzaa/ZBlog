/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:53:23
 * @version $Id$
 */

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: '../client/src/index.js',
  output: {
    path: path.join(__dirname, '..', '/client/dist/js'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
  }
} 

