/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 14:59:44
 * @version $Id$
 */

import app from '../app'
import mongoose from 'mongoose'

const port = (process.env.VCAP_APP_PORT || 8089)
const host = (process.env.VCAP_APP_HOST || 'localhost')
const db_url = (process.env.DATABASE_URL || 'mongodb://localhost:27017/zblog')

try {
    mongoose.connect(db_url)
    console.log('mongodb connected at port: 27017')
} catch (e) {
    console.error('mongodb error:' + e)
} finally {
    app.listen(port, host, ()=>{
        console.log('server listen at port: 8089')
    })
}
