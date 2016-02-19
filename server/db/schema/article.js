import mongoose, { Schema } from 'mongoose'

/**
 * 文章模型
 * @param {String} title 文章标题
 * @param {String} author 文章作者
 * @param {String} content 文章内容
 * @param {String} description 文章描述
 * @param {String} tags 文章标签
 * @param {String} views 文章浏览数
 * @param {String} comments 文章评论数
 * @param {String} stars 文章点赞数
 * @param {Date} create_time 文章创建日期
 **/
const ArticleSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Admin'
    },
    content: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    tags: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: {
        type: Number,
        default: 0,
        min: 0
    },
    stars: {
        type: Number,
        default: 0,
        min: 0
    },
    create_time: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('Article', ArticleSchema)
