import Article from '../../../db/Article'

const router = require('koa-router')()

router.get('/articleList', function*() {
    let currentPage = (parseInt(this.query.currentPage,10) > 0) ? parseInt(this.query.currentPage,10) : 1
    let keyword = this.query.keyword
    const query = keyword === '' ? {} : {title: new RegExp(keyword, 'i')}

    try {
        const articles = yield Article.getArticles(currentPage, keyword)
        const count = yield Article.getArticleCount(query)

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
    const query = {_id: id}

    try {
        const article = yield Article.getArticleById(id)
        const count = yield Article.getArticleCount(query)

        article.views++
        yield Article.updateArticle(id,{$inc: {views: 1}})
        this.status = 200
        this.body = {
            data: article.info,
            count: count
        }
    } catch (err) {
        this.throw(err)
    }
})
router.get('/articleDetail/:id/preNextArticle', function*() {
    let id = this.params.id
    let preCondition,nextCondition

    try {
        const article = yield Article.getArticleById(id)

        preCondition = {'_id': {$ne: id},'update_time': {'$lte': article.update_time}}
        nextCondition = {'_id': {$ne: id},'update_time': {'$gte': article.update_time}}

        const preResult = yield Article.getArticlePreNext(preCondition, {update_time: -1})
        const nextResult = yield Article.getArticlePreNext(nextCondition, {update_time: 1})
        const prev = preResult[0] || {}
        const next = nextResult[0] || {}

        this.status = 200
        this.body = {data: {'prev': prev, 'next': next}}
    } catch (err) {
        this.throw(err)
    }
})

router.get('/create', function*() {
    let data = {
        title: 'test',
        content: 'sssssssssssssssssssssss',
        description: 'test'
    }

    Article.createArticle(data)
})
export default router
