import mongoose, { Schema } from 'mongoose'

const ArticleSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
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
        default: Date.now
    },
    update_time: {
        type: Date,
        default: Date.now
    }
})

ArticleSchema.virtual('info').get(
    function() {
        return {
            'title': this.title,
            'author': this.author,
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
