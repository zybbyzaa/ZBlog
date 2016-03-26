import passport from 'koa-passport'
import {Strategy} from 'passport-github'
import co from 'co'
import User from '../../../../db/User'
import config from '../../../../config.js'

export function githubSetup(User) {
    passport.use(new Strategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL,
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        const userId = null

        profile._json.token = accessToken
        if(userId) {
            return done(new Error('您已经是登录状态了'))
        }
        co(function*() {
            const checkUserId = yield User.findUser({
                'github.id': profile.id
            })

            if (checkUserId) {
                return done(null, checkUserId)
            }
            let newUser = {
                username: profile.displayName || profile.username,
                avatar: profile._json.avatar_url || '',
                provider: 'github',
                github: profile._json
            }
            // const checkUserName = yield User.findUser({
            //     username: newUser.username
            // })
            //
            // if (checkUser) {
            //     newUser.nickname = tools.randomString()
            // }
            const user = yield User.createUser(newUser)

            return done(null, user)
        }).catch(function(err) {
            return done(err)
        })
    }
    ))
}
