import passport from 'koa-passport'
import {Strategy} from 'passport-github'
import co from 'co'
import User from '../../../../db/User'

export function githubSetup(User) {
    passport.use(new Strategy({
        clientID: 'f1e112b810375ed8066a',
        clientSecret: '11e1102de4e95cb58805a4512b4ea098671d9366',
        callbackURL: 'http://localhost:8089/api/auth/github/callback',
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
