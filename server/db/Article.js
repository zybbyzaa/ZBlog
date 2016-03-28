import ArticleModel from './schema/article'

const Article = {

    createArticle(data) {
        return new ArticleModel(data).save()
    },
    deleteArticelById(id) {
        return ArticleModel.findByIdAndRemove(id)
    },
    getArticles(pageNum) {
        const sort = {
            update_time: -1
        }

        return ArticleModel.find().sort(sort).populate({path: 'author', select: 'username avatar'}).limit(3).skip((pageNum - 1) * 3).exec()
    },
    getArticleById(id) {
        const query = {
            _id: id
        }

        return ArticleModel.findOne(query).populate({path: 'author tags', select: 'username avatar name'}).exec()
    },
    getArticleCount(id) {
        const query = id ? { _id: id} : null

        return ArticleModel.count(query)
    },
    getArticlePreNext(condition,sort) {
        return ArticleModel.find(condition).select('title').limit(1).sort(sort)
    },
    updateArticle(id, updateCondtion) {
        return ArticleModel.findByIdAndUpdate(id,updateCondtion)
    }
}

export default Article
