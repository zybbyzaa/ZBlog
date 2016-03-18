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
import session from 'koa-generic-session'
import mongostore from 'koa-generic-session-mongo'
import json from 'koa-json'
import compress from 'koa-compress'
import cors from 'koa-cors'
import passport from 'koa-passport'
import path from 'path'

import routes from './routes'


const app = koa()

onerror(app)

app.use(logger())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(parser())
app.use(json())
app.use(staticServe('./client/dist'))
app.use(staticServe('./server/assets', {
    maxage: 1296000
}))
app.keys = ['Zblog-secret']
app.use(session({
    store: new mongostore(),
    cookie: {
        maxage: 24 * 3600
    }
}))
app.use(passport.initialize())
app.use(compress())

render(app, {
    root: path.join(__dirname, '..', 'client/dist'),
    layout: false,
    viewExt: 'html',
    debug: false,
    cache: true
})

routes(app)

export default app
