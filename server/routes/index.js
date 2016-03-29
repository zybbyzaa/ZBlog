/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 15:08:17
 * @version $Id$
 */
import users from './api/users'
import article from './api/article'
import auth from './api/auth'
import album from './api/album'
import comment from './api/comment'
import tag from './api/tags'
import { logger } from '../utils/log'

export default function(app) {
    const Router = require('koa-router')()

    Router.use('/api/users', users.routes(), users.allowedMethods())
    Router.use('/api/auth', auth.routes(), auth.allowedMethods())
    Router.use('/api/article', article.routes(), article.allowedMethods())
    Router.use('/api/album', album.routes(), album.allowedMethods())
    Router.use('/api/comment', comment.routes(), comment.allowedMethods())
    Router.use('/api/tag', tag.routes(), tag.allowedMethods())
    Router.get('/', function* () {
        logger.info('enter index')
        yield this.render('index')
    })
    Router.get('*', function* () {
        yield this.render('index')
    })
    app.use(Router.routes())
}
