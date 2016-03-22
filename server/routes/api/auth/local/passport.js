import passport from 'koa-passport'
import {Strategy} from 'passport-local'
import co from 'co'
import User from '../../../../db/User'

export function localSetup(User) {
    passport.serializeUser(function(user, done) {
        done(null, user._id)
    })
    passport.deserializeUser(function(id, done) {
        User.getUserById(id, done)
    })
    passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        co(function *() {
            const user = yield User.getUserByEmail(email.toLowerCase())

            if (!user) {
                return done(null, false, { error_msg: '用户名或密码错误.' })
            }
            if (!user.authenticate(password)) {
                return done(null, false, { error_msg: '用户名或密码错误.' })
            }
            return done(null, user)
        }).catch(function (err) {
            return done(err)
        })
    }
    ))
}
