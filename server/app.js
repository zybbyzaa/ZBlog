/**
 * 服务器入口
 * @zyb (zybbyzaa@163.com)
 * @date    2016-01-30 20:24:26
 * @version $Id$
 */

import koa from 'koa'
import staticServe from 'koa-static'
import router from 'koa-router'
import render from 'koa-ejs'
import parser from 'koa-bodyparser'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import path from 'path'

import routes from './routes'


const app = koa()

onerror(app)

app.use(logger())
app.use(parser())
app.use(staticServe('./client/dist'))
app.use(staticServe('./server/assets', {
    maxage: 1296000
}))

render(app, {
    root: path.join(__dirname, '..', 'client/dist'),
    layout: false,
    viewExt: 'html',
    debug: false,
    cache: true
})

routes(app)

export default app
