import UserModel from './schema/user'

const User = {

    createUser(data) {
        return new UserModel(data).save()
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
    }
}

export default User
