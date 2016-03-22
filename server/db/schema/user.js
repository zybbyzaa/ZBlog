import mongoose, {
    Schema
} from 'mongoose'
import crypto from 'crypto'

const UserSchema = new Schema({
    username: String,
    email: {
        type: String,
        lowercase: true
    },
    provider: {
        type: String,
        default: 'local'
    },
    github: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    weixin: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    hashedPassword: String,
    salt: String,
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: '/img/icon.jpg'
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    update_time: {
        type: Date,
        default: Date.now
    }
})

UserSchema.virtual('password').set(
    function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashedPassword = this.encryptPassword(password)
    }).get(
        function() {
            return this._password
        })


UserSchema.virtual('userInfo').get(
    function() {
        return {
            'uid': this._id,
            'username': this.username,
            'role': this.role,
            'email': this.email,
            'avatar': this.avatar,
            'provider': this.provider
        }
    })

UserSchema.path('username').validate(
    function(value, respond) {
        var self = this

        this.constructor.findOne({
            username: value
        }, function(err, user) {
            if (err) {
                throw err
            }
            if (user) {
                if (self.id === user.id) {
                    return respond(true)
                }
                return respond(false)
            }
            respond(true)
        })
    }, '这个呢称已经被使用.')

UserSchema.methods = {
    //检查用户权限
    hasRole: function(role) {
        var selfRoles = this.role

        return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== -1)
    },
    //验证用户密码
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword
    },
    //生成盐
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64')
    },
    //生成密码
    encryptPassword: function(password) {
        if (!password || !this.salt) {
            return ''
        }
        var salt = new Buffer(this.salt, 'base64')

        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64')
    }
}

export default mongoose.model('User', UserSchema)
