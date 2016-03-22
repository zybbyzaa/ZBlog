import mongoose, { Schema } from 'mongoose'

const CommentSchema = new Schema({
    aid: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    replys: [{
        content: String,
        userinfo: Object,
        create_time: Date
    }],
    create_time: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Comment', CommentSchema)
