import AlbumModel from './schema/album'

const Album = {

    createAlbum(data) {
        return new AlbumModel(data).save()
    },
    deleteAlbumById(id) {
        return AlbumModel.findByIdAndRemove(id)
    },
    getAlbums(pageNum, keyword) {
        const condition = keyword === '' ? {} : {name: new RegExp(keyword, 'i')}

        return AlbumModel.find(condition).sort({create_time: -1}).populate({path: 'author', select: 'username avatar'}).limit(6).skip((pageNum - 1) * 6).exec()
    },
    getAlbumById(id) {
        return AlbumModel.findOne({_id: id}).populate({path: 'author tags', select: 'username avatar name'}).exec()
    },
    getAlbumCount(query) {
        return AlbumModel.count(query)
    },
    updateAlbum(id, updateCondtion) {
        return AlbumModel.findByIdAndUpdate(id,updateCondtion)
    }
}

export default Album
