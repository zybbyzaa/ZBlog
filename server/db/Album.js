import AlbumModel from './schema/album'

const Album = {

    createAlbum(data) {
        return new AlbumModel(data).save()
    },
    deleteAlbumById(id) {
        return AlbumModel.findByIdAndRemove(id)
    },
    getAlbums(pageNum) {
        return AlbumModel.find().sort({create_time: -1}).populate({path: 'author', select: 'username avatar'}).limit(6).skip((pageNum - 1) * 6).exec()
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
