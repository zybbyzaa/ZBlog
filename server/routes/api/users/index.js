import User from '../../../db/User'
import UserModel from '../../../db/schema/user'
import {isAuthenticated} from '../auth/auth.service'
import {logger} from '../../../utils/log'

const router = require('koa-router')()

router.get('/createUser', function*() {
    let user = new UserModel({
        username: 'test3',
        email: '123@1231.com',
        password: '123456'
    })

    User.createUser(user)
})
router.get('/getUserInfo', isAuthenticated(), function*() {
    const userId = this.req.user._id

    try {
        const user = yield User.getUserById(userId)

        this.status = 200
        this.body = user.userInfo
        logger.info('getuserinfo')
    } catch (err) {
        this.throw(err)
    }
})
export default router
