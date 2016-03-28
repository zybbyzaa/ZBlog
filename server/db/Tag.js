import TagModel from './schema/tag'

const Tag = {

    createTag(data) {
        return new TagModel(data).save()
    },
    deleteTagById(id) {
        return TagModel.findByIdAndRemove(id)
    },
    getTagsByType(type) {
        return TagModel.find({tag_type: type}).sort({create_time: -1}).exec()
    },
    getTagById(id) {
        return TagModel.findOne({_id: id}).exec()
    },
    getTagCount() {
        return TagModel.count()
    },
    updateTag(id, updateCondtion) {
        return TagModel.findByIdAndUpdate(id,updateCondtion)
    }
}

export default Tag
