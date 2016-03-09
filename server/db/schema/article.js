import mongoose, { Schema } from 'mongoose'

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
    create_time: {
        type: Date,
        default: new Date()
    },
    update_time: {
        type: Date,
        default: new Date()
    }
})

ArticleSchema.virtual('info').get(
    function() {
        return {
            '_id': this._id,
            'title': this.title,
            'content': this.content,
            'description': this.description,
            'views': this.views,
            'comments': this.comments,
            'update_time': this.update_time,
            'tags': this.tags
        }
    }
)

export default mongoose.model('Article', ArticleSchema)
