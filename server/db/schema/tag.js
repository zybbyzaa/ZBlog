import mongoose, { Schema } from 'mongoose'

const TagSchema = new Schema({
    name: String,
    tag_type: {
        type: String,
        default: 'article'
    },
    create_time: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Tag', TagSchema)
