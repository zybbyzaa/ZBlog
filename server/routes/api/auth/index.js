import User from '../../../db/User'
import koa from 'koa-router'
import passport from 'koa-passport'
import {Setup} from './local/passport'
import local from './local'

const router = koa()

// Passport Configuration
Setup(User)
// require('./github/passport').setup(User, config)
// require('./weibo/passport').setup(User, config)
// require('./qq/passport').setup(User, config)

router.use('/local',local.routes())
//router.use('/github',require('./github').routes())
// router.use('/weibo',require('./weibo').routes())
// router.use('/qq',require('./qq').routes())

export default router
