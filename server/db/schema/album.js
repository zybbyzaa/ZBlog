import mongoose, { Schema } from 'mongoose'

const AlbumSchema = new Schema({
    name: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    img_url: {
        type: Array,
        default: []
    },
    description: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
    create_time: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Album', AlbumSchema)
