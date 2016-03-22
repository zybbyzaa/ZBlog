import User from '../../../db/User'
import koa from 'koa-router'
import passport from 'koa-passport'
import {localSetup} from './local/passport'
import {githubSetup} from './github/passport'
import local from './local'
import github from './github'

const router = koa()

// Passport Configuration
localSetup(User)
githubSetup(User)
// require('./github/passport').setup(User, config)
// require('./weibo/passport').setup(User, config)
// require('./qq/passport').setup(User, config)

router.use('/local',local.routes())
router.use('/github',github.routes())
// router.use('/weibo',require('./weibo').routes())
// router.use('/qq',require('./qq').routes())

export default router
