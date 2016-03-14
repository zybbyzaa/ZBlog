import UserModel from './schema/user'

const User = {

    createUser(data) {
        return new UserModel(data).save()
    }
}

export default User
