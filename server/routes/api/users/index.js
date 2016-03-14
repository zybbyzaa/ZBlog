import User from '../../../db/User'
import UserModel from '../../../db/schema/user'

const router = require('koa-router')()

router.get('/createUser', function*() {
    let user = new UserModel({
        username: 'test2',
        email: '123@123.com',
        password: '123456'
    })

    User.createUser(user)
})
export default router
