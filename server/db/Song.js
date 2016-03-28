import SongModel from './schema/song'

const Song = {

    createSong(data) {
        return new SongModel(data).save()
    },
    deleteSongById(id) {
        return SongModel.findByIdAndRemove(id)
    },
    getSongs() {
        return SongModel.find().sort({create_time: -1}).exec()
    },
    getSongById(id) {
        return SongModel.findOne({_id: id}).exec()
    },
    getSongCount() {
        return SongModel.count()
    },
    updateSong(id, updateCondtion) {
        return SongModel.findByIdAndUpdate(id,updateCondtion)
    }
}

export default Song
