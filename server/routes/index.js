/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 15:08:17
 * @version $Id$
 */

export default function(Router) {
    const router = new Router()

    router.get('/', function* () {
        yield this.render('index')
    })

    router.get('*', function* () {
        yield this.render('index')
    })

    return router
}
