/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 15:08:17
 * @version $Id$
 */
import users from './api/users'
import article from './api/article'
//import auth from './api/auth'

export default function(app) {
    const Router = require('koa-router')()

    Router.use('/api/users', users.routes(), users.allowedMethods())
    //Router.use('/api/auth', auth.routes(), auth.allowedMethods())
    Router.use('/api/article', article.routes(), article.allowedMethods())
    Router.get('/', function* () {
        yield this.render('index')
    })
    Router.get('*', function* () {
        yield this.render('index')
    })
    app.use(Router.routes())
}
