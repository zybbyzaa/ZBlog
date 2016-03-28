import AlbumModel from './schema/album'

const Album = {

    createAlbum(data) {
        return new AlbumModel(data).save()
    },
    deleteAlbumById(id) {
        return AlbumModel.findByIdAndRemove(id)
    },
    getAlbums() {
        return AlbumModel.find().sort({create_time: -1}).exec()
    },
    getAlbumById(id) {
        return AlbumModel.findOne({_id: id}).exec()
    },
    getAlbumCount() {
        return AlbumModel.count()
    },
    updateAlbum(id, updateCondtion) {
        return AlbumModel.findByIdAndUpdate(id,updateCondtion)
    }
}

export default Album
