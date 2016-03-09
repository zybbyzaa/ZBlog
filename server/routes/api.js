/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 15:08:52
 * @version $Id$
 */
import Article from '../db/Article'

export default function(Router) {
    const router = new Router({
        prefix: '/api'
    })

    router.get('/articleList', function*() {
        let currentPage = (parseInt(this.query.currentPage) > 0) ? parseInt(this.query.currentPage) : 1

        try {
            const articles = yield Article.getArticles(currentPage)
            const count = yield Article.getArticleCount()

            this.status = 200
            this.body = {
                data: articles,
                count: count
            }
        } catch (err) {
            this.throw(err)
        }

    })
    router.get('/articleDetail/:id', function*() {
            let id = this.params.id

            try {
                const article = yield Article.getArticleById(id)
                const count = article ? 1 : 0

                this.status = 200
                this.body = {
                    data: article,
                    count: count
                }
            } catch (err) {
                this.throw(err)
            }
    })

    router.get('/create', function*() {
        let body = this.request.body
        let data = {
            title: 'test',
            content: 'sssssssssssssssssssssss',
            description: 'test',
            tags: ['web', 'nodejs', 'java']
        }

        Article.createArticle(data)
    })

    router.get('*', function*() {
        console.log('the api service')
    })

    return router
}
