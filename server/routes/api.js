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

    router.get('/articleList', function* () {
        let currentPage = (parseInt(this.query.currentPage) > 0)?parseInt(this.query.currentPage):1;

        try {
            const articles = yield Article.getArticles(currentPage)
            const count = yield Article.getArticleCount()
            this.status = 200;
            this.body = { data: articles, count:count };
        }catch(err) {
            this.throw(err)
        }

    })
    // router.get('/article/page/:pageNum', function* () {
    //     let pageNum = this.params.pageNum ? this.params.pageNum : 1
    //     let articles = yield Article.getArticles(pageNum)
    //     let count = yield Article.getArticleCount()

    //     this.body = {
    //         articles: articles,
    //         count: count
    //     }
    // })
    router.get('/article/:id', function* () {
        let id = this.params.id

        let article = yield Article.getArticleById(id)
        let count = yield Article.getArticleCount()

        this.body = {
            article: article,
            count: count
        }
    })
    // router.get('/article', function* () {
    //     let articles = yield Article.getArticles()

    //     this.body = {
    //         articles: articles
    //     }
    // })

    router.post('/create', function* () {
        let body = this.request.body
        let data = {
            title: body.title,
            content: body.content,
            description: 'test',
            tags: ['web','nodejs','java']
        }

        Article.createArticle(data)
    })

    router.get('*', function* () {
        console.log('the api service')
    })

    return router
}
