import Album from '../../../db/Album'
import AlbumModel from '../../../db/schema/album'

const router = require('koa-router')()

router.get('/createAlbum', function*() {
    let album = new AlbumModel({
        name: 'tets',
        author: this.session.passport.user,
        img_url: ['http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg','http://7xrkxz.com1.z0.glb.clouddn.com/img%2Falbum%2Falbum-bg.jpg'],
        description: 'this is a test album'
    })

    Album.createAlbum(album)
})
router.get('/albumList', function*() {
    let currentPage = (parseInt(this.query.currentPage,10) > 0) ? parseInt(this.query.currentPage,10) : 1
    let keyword = this.query.keyword
    const query = keyword === '' ? {} : {name: new RegExp(keyword, 'i')}

    try {
        const albums = yield Album.getAlbums(currentPage, keyword)
        const count = yield Album.getAlbumCount(query)

        this.status = 200
        this.body = {
            data: albums,
            count: count
        }
    } catch (err) {
        this.throw(err)
    }

})
router.get('/albumDetail/:id', function*() {
    let id = this.params.id

    try {
        const album = yield Album.getAlbumById(id)
        const count = yield Album.getAlbumCount(id)

        this.status = 200
        this.body = {
            data: album,
            count: count
        }
    } catch (err) {
        this.throw(err)
    }
})
export default router
