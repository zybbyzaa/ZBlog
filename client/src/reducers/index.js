/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:33:55
 * @version $Id$
 */

import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import options from './options'
import {articleList} from './articles'

const rootReducer = combineReducers({
    articleList,
    options,
    routing: routeReducer
})

export default rootReducer
