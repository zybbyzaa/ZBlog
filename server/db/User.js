import UserModel from './schema/user'

const User = {

    createUser(data) {
        return new UserModel(data).save()
    },
    deleteUserById(id) {
        return UserModel.findByIdAndRemove(id)
    },
    getUserById(id) {
        const query = {
            _id: id
        }

        return UserModel.findOne(query).exec()
    },
    getUserByEmail(email) {
        const query = {
            email: email
        }

        return UserModel.findOne(query).exec()
    },
    getUser(condition) {
        return UserModel.findOne(condition).exec()
    },
    getUserCount() {
        return UserModel.count()
    },
    updateUser(id, updateCondtion) {
        return UserModel.findByIdAndUpdate(id,updateCondtion)
    }
}

export default User
