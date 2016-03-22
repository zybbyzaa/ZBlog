import CommentModel from './schema/comment.js'

const Comment = {
    getAllComments(aid) {
        const sort = {
            create_time: -1
        }

        return CommentModel.find({aid: aid}).sort(sort).populate({path: 'uid', select: 'username avatar'}).exec()
    },
    addComment(comment) {
        return new CommentModel(comment).save()
    },
    addReply(cid, reply) {
        return CommentModel.findByIdAndUpdate(cid,{'$push': {'replys': reply}},{new: true})
    }
}

export default Comment
