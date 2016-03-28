var webpack = require('webpack')
var path = require('path')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')

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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true
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
    postcss: [
        require('autoprefixer'),
        require('postcss-color-rebeccapurple')
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
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=img/[hash].[ext]'
        }, {
            test: /\.woff$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot$/,
            loader: 'file'
        }, {
            test: /\.svg$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }]
    }
}
