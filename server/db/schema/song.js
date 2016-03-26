import mongoose, { Schema } from 'mongoose'

const SongSchema = new Schema({
    title: String,
    url: String,
    create_time: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Song', SongSchema)
