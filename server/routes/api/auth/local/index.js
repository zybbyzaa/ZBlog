import User from '../../../../db/User'
import koa from 'koa-router'
import passport from 'koa-passport'
import {signToken} from '../auth.service'

const router = koa()

function check() {
    return function *(next) {
        let error_msg

        if(this.request.body.email === '' || this.request.body.password === ''){
            error_msg = '用户名和密码不能为空.'
        }
        if(error_msg){
            this.status = 422
            return this.body = {error_msg:error_msg}
        }
        yield next
    }
}

router.post('/', check(), function*(next) {
    var ctx = this

    yield passport.authenticate('local', function*(err, user, info) {
        if (err){
            ctx.throw(err)
        }
        if(info){
            ctx.status = 403
            return ctx.body = info
        }
        const token = signToken(user._id)

        //ctx.state.user = user
        ctx.body = {
            token: token
        }
        yield ctx.login(user)
    }).call(this, next)
})

export default router
