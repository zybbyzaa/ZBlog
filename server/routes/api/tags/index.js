import Tag from '../../../db/Tag'
import TagModel from '../../../db/schema/tag'

const router = require('koa-router')()

router.get('/createTag', function*() {
    let tag = new TagModel({
        name: 'life',
        tag_type: 'album'
    })

    Tag.createTag(tag)
})
export default router
