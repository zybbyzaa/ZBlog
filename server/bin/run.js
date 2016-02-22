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
try {
    mongoose.connect('mongodb://2fc9477e-cece-4963-b94c-fc98817a0174:jewsZ5LirWvvbMPBw-Hm5w@10.9.58.169:27017/ffa94aad-c74e-45b2-b7ee-daeb2a29e8e2')
    console.log('mongodb connected at port: 27017')
} catch (e) {
    console.error('mongodb error:' + e)
} finally {
    app.listen(port, host, ()=>{
        console.log('server listen at port: ' + port)
    })
}
