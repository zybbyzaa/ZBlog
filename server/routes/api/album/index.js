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

    try {
        const albums = yield Album.getAlbums(currentPage)
        const count = yield Album.getAlbumCount()

        this.status = 200
        this.body = {
            data: albums,
            count: count
        }
    } catch (err) {
        this.throw(err)
    }

})
export default router
