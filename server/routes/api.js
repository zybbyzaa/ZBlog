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

    router.get('/article', function* () {
        let articles = yield Article.getArticles(1)
        let count = yield Article.getArticleCount()

        this.body = {
            articles: articles,
            count: count
        }
    })
    router.get('/article/page/:pageNum', function* () {
        let pageNum = this.params.pageNum ? this.params.pageNum : 1
        let articles = yield Article.getArticles(pageNum)
        let count = yield Article.getArticleCount()

        this.body = {
            articles: articles,
            count: count
        }
    })
    router.get('/article/:id', function* () {
        let id = this.params.id
        console.log(id)
        let article = yield Article.getArticleById(id)
        let count = yield Article.getArticleCount()

        this.body = {
            articles: article,
            count: count
        }
    })
    router.get('/article', function* () {
        let articles = yield Article.getArticles()

        this.body = {
            articles: articles
        }
    })

    router.get('/create', function* () {
        let data = {
            title: 'test',
            content: 'test111111111',
            description: 'test'
        }

        Article.createArticle(data)
    })

    router.get('*', function* () {
        console.log('the api service')
    })

    return router
}
