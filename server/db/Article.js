import ArticleModel from './schema/article'

const Article = {

    /**
     *  获取所有文章
     * */

    getArticles(pageNum) {
        const sort = {
            _id: -1
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
    getArticleCount() {
        return ArticleModel.count()
    },
    createArticle(data) {
        return new ArticleModel(data).save()
    }
}

export default Article
