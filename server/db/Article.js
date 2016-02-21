import ArticleModel from './schema/article'

const Article = {

    /**
     *  获取所有文章
     * */

    getArticles() {

        return ArticleModel.find().limit(5).exec()
    },

    /**
     * 根据id获取某文章信息
     * @param {ObjectId} id
     * @return {PostSchema} post
     * */

    getArticle(id) {
        const query = {
            _id: id
        }

        return ArticleModel.findOne(query).exec()
    },
    createArticle(data) {
        return new ArticleModel(data).save()
    }
}

export default Article
