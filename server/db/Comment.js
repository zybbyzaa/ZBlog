import CommentModel from './schema/comment.js'

const Comment = {

    addComment(comment) {
        return new CommentModel(comment).save()
    },
    addReply(cid, reply) {
        return CommentModel.findByIdAndUpdate(cid,{'$push': {'replys': reply}},{new: true})
    },
    deleteCommentById(id) {
        return CommentModel.findByIdAndRemove(id)
    },
    deleteCommentByArtcileId(id) {
        return CommentModel.remove({aid: id})
    },
    getAllComments(aid,cur) {
        const sort = {
            create_time: -1
        }

        return CommentModel.find({aid: aid}).sort(sort).populate({path: 'uid', select: 'username avatar'}).limit(5).skip(cur).exec()
    },
    getCommentCount() {
        return CommentModel.count()
    }
}

export default Comment
