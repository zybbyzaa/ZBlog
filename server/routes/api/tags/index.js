import Tag from '../../../db/Tag'
import TagModel from '../../../db/schema/tag'

const router = require('koa-router')()

router.get('/createTag', function*() {
    let tag = new TagModel({
        name: 'java'
    })

    Tag.createTag(tag)
})
export default router
