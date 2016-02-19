/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 14:59:44
 * @version $Id$
 */

import app from '../app'
import mongoose from 'mongoose'

try {
    mongoose.connect('mongodb://localhost:27017/zblog')
    console.log('mongodb connected at port: 27017')
} catch (e) {
    console.error('mongodb error:' + e)
} finally {
    app.listen(8089, 'localhost', ()=>{
        console.log('server listen at port: 8089')
    })
}
