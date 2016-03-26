import mongoose, { Schema } from 'mongoose'

const AlbumSchema = new Schema({
    name: String,
    imgUrl: {
        type: Array,
        default: []
    },
    description: String,
    create_time: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Album', AlbumSchema)
