import { REQUEST_ALBUM_LIST, ALBUM_LIST } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import { fromJS, Map, List } from 'immutable'

const initialState = fromJS({
    isFetching: false,
    items: [],
    items_count: 0
})

export const albumList = createReducer(initialState,{
    [REQUEST_ALBUM_LIST]: (state,action)=>state.set('isFetching',true),
    [ALBUM_LIST]: (state,action)=>{
        return state.merge({
            isFetching: false,
            items: action.albumList,
            items_count: action.count
        })
    }
})
