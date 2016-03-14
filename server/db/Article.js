import ArticleModel from './schema/article'

const Article = {

    /**
     *  获取所有文章
     * */

    getArticles(pageNum) {
        const sort = {
            update_time : -1
        }

        return ArticleModel.find().sort(sort).limit(3).skip((pageNum - 1) * 3).exec()
    },

    /**
     * 根据id获取某文章信息
     * @param {ObjectId} id
     * @return {PostSchema} post
     * */

    getArticleById(id) {
        const query = {
            _id: id
        }

        return ArticleModel.findOne(query).exec()
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
    },
    createArticle(data) {
        return new ArticleModel(data).save()
    }
}

export default Article
