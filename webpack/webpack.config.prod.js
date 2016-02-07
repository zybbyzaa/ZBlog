/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-05 23:21:26
 * @version $Id$
 */

var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
         lib: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'react-router-redux'
        ],
        app: [
            './client/src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, '..', '/client/dist'),
        filename: 'js/[name]-[chunkhash].js',
        publicPath: '/dist/',
        chunkFilename: '[name]-[chunkhash].chunk.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            minChunks: Infinity
        }),
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
            include: path.join(__dirname, '..', '/client/src')
        }]
    }
};
