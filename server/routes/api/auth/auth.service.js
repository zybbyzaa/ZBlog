import jwt from 'koa-jwt'
import compose from 'koa-compose'
import User from '../../../db/User'

/**
 * 验证token
 */
export function authToken() {
    return compose([
        function *(next) {
            if(this.query && this.query.hasOwnProperty('access_token')){
                this.headers.authorization = 'Bearer ' + this.query.access_token
            }
            console.log(this.session)
            yield next
        },
        jwt({ secret: 'Zblog-secret',passthrough: true })
    ])
}

/**
 * 验证用户是否登录
 */
export function isAuthenticated() {
    return compose([
        authToken(),
        // function *(next) {
        //     if(!this.session.user) {
        //         this.throw('UnauthorizedError',401)
        //         yield next
        //     }
        // },
        function *(next) {
            var user = yield User.getUserById(this.session.passport.user)

            if (!user) {
                this.throw('UnauthorizedError',401)
            }
            this.req.user = user
            yield next
        }
    ])
}

/**
 * 验证用户权限
 */
export function hasRole(roleRequired) {
    if (!roleRequired) {
        this.throw('Required role needs to be set')
    }
    return compose([
        isAuthenticated(),
        function *(next) {
            if (config.userRoles.indexOf(this.req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                yield next
            }else {
                this.throw(403)
            }
        }
    ])
}

/**
 * 生成token
 */
export function signToken(id) {
    return jwt.sign({ _id: id }, 'Zblog-secret', { expiresIn: '1y' })
}

/**
 * sns登录传递参数
 */
export function snsPassport() {
    return compose([
        authToken(),
        function*(next) {
            this.session.passport = {
                redirectUrl: this.query.redirectUrl || '/'
            }
            if (this.state.user) {
                this.session.passport.userId = this.state.user._id
            }
            yield next
        }
    ])
}
