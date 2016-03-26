/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 14:59:44
 * @version $Id$
 */

import app from '../app'
import mongoose from 'mongoose'
import config from '../config.js'
import { logger } from '../utils/log'

const port = (process.env.VCAP_APP_PORT || config.port)
const host = (process.env.VCAP_APP_HOST || config.host)
const db_url = (process.env.DATABASE_URL || config.db.url)

try {
    mongoose.connect(db_url)
    logger.info('mongodb connected at port: 27017')
} catch (e) {
    logger.error('mongodb error:' + e)
} finally {
    app.listen(port, host, ()=>{
        logger.info('server listen at port: ' + port)
        logger.info('server started in model: ' + config.env)
    })
}
