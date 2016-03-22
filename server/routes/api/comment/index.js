import Comment from '../../../db/Comment'
import Article from '../../../db/Article'
import {isAuthenticated} from '../auth/auth.service'

const router = require('koa-router')()

router.get('/getCommentList/:aid', function*() {
    const aid = this.params.aid

    try {
        const commentList = yield Comment.getAllComments(aid)

        this.status = 200
        this.body = {data: commentList}
    } catch (err) {
        this.throw(err)
    }
})
router.post('/addComment', isAuthenticated(), function*() {
    const aid = this.request.body.aid
    const content = this.request.body.content
    const userId = this.req.user._id
    let error_msg

    console.log(this.req)
    console.log(this.session)
    if(!aid){
        error_msg = '缺少必须参数'
    }else if(!content || content == ''){
        error_msg = '评论内容不能为空'
    }
    if(error_msg){
        this.status = 422
        return this.body = { error_msg :error_msg }
    }
    try{
        const data = { aid: aid, uid: userId, content: content }
        console.log(data)
        let result = yield Comment.addComment(data)
        let comment = result.toObject()

        comment.uid = {
            _id: this.req.user._id,
            username: this.req.user.username,
            avatar: this.req.user.avatar
        }
        yield Article.updateArticle(aid,{$inc: {comments: 1}})
        this.status = 200
        this.body = {success: true,data: comment}
    }catch(err){
        this.throw(err)
    }
})
router.post('/addReply/:id', isAuthenticated(), function*() {
    const cid = this.params.id

    if(!this.request.body.content || this.request.body.content == ''){
        this.status = 422
        return this.body = {error_msg: "回复内容不能为空"}
    }
    let reply = this.request.body

    reply.userinfo = {
        id: this.req.user._id,
        username: this.req.user.username
    }
    reply.create_time = new Date()
    console.log(reply)
    try{
        const result = yield Comment.addReply(cid, reply)

        this.status = 200
        this.body = {success: true,data: result.replys}
    }catch(err){
        this.throw(err)
    }
})
export default router
