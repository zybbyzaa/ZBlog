import { PAGENUM } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map, List, fromJS} from 'immutable'

const initialState = fromJS({
    currentPage: 1
})

export default createReducer(initialState,{
    [PAGENUM]: (state,action)=>state.set('currentPage',action.num)
})
