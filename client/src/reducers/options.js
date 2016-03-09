import { CHANGEPAGENUM, TOGGLENAV } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map, List, fromJS} from 'immutable'

const initialState = fromJS({
    currentPage: 1,
    isShowNav: false
})

export default createReducer(initialState,{
    [CHANGEPAGENUM]: (state,action) => state.set('currentPage',action.pageNum),
    [TOGGLENAV]: (state,action) => state.set('isShowNav',action.isShowNav)
})