import {
    REQUEST_ARTICLE_LIST,
    ARTICLE_LIST,
    REQUEST_ARTICLE_DETAIL,
    ARTICLE_DETAIL
} from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import { fromJS, Map, List } from 'immutable'

const initialState = fromJS({
    isFetching: false,
    items: [],
    items_count: 0
})

export const articleList = createReducer(initialState,{
    [REQUEST_ARTICLE_LIST]: (state,action)=>state.set('isFetching',true),
    [ARTICLE_LIST]: (state,action)=>{
        return state.merge({
            isFetching: false,
            items: action.articleList,
            items_count: action.count
        })
    }
})

export const articleDetail = createReducer(initialState,{
    [REQUEST_ARTICLE_DETAIL]: (state,action)=>state.set('isFetching',true),
    [ARTICLE_DETAIL]: (state,action)=>{
        return state.merge({
            isFetching: false,
            items: action.articleDetail,
            items_count: action.count
        })
    }
})
