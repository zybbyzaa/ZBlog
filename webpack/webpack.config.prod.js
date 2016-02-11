/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-05 23:21:26
 * @version $Id$
 */

var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        publicPath: '/',
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
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')
            },
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            minChunks: Infinity
        }),
        new ExtractTextPlugin('css/[name]-[chunkhash].css', {
            allChunks: true
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
            exclude: /node_modules/,
            include: path.join(__dirname, '..', '/client/src')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpg)$/,
            loader: "url-loader?limit=8192&name=img/[hash].[ext]"
        }, {
            test: /\.woff(\?ks0u17)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?ks0u17)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?ks0u17)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?ks0u17)?(#iefix)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?ks0u17)?(#icomoon)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }]
    }
};
