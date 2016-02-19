var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.dev')
var proxyMiddleware = require('http-proxy-middleware')
var proxy = proxyMiddleware('/api', {
    target: 'http://localhost:8089',
    changeOrigin: true
})

var app = new (require('express'))()
var port = 8088

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}))
app.use(webpackHotMiddleware(compiler))
app.use(proxy)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '../client/dist/index.html')
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
})
