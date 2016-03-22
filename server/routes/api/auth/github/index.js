import User from '../../../../db/User'
import koa from 'koa-router'
import passport from 'koa-passport'
import {snsPassport,signToken} from '../auth.service'

const router = koa()

router.get('/', snsPassport(), passport.authenticate('github', {
    failureRedirect: '/'
}))
router.get('/callback', function*(next) {
    var ctx = this

    yield passport.authenticate('github', function *(err, user, redirectURL) {
        const redirectUrl = '/'
        let snsmsg = {}

        console.log(user)
        console.log(redirectURL)
        if (err || !user) {
            snsmsg.msg = 'login failure'
            snsmsg.msgtype = 'error'
            console.log(err)
        }else{
            snsmsg.msgtype = 'success'
            snsmsg.msg = 'login success!'
            const token = signToken(user._id)

            ctx.cookies.set('token',token,{ path: '/',maxAge: 3600000, httpOnly: false })
        }
        ctx.cookies.set('snsmsg',JSON.stringify(snsmsg),{ path: '/',maxAge: 3600000 })
        ctx.session.passport = {user: user._id}
        return ctx.redirect(redirectUrl)
    }).call(this, next)
})
export default router
