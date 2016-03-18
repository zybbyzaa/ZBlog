import { CHANGEPAGENUM, TOGGLENAV, TOGGLELOGINMODAL } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map, List, fromJS} from 'immutable'

const initialState = fromJS({
    articleQuery: {currentPage: 1},
    isShowNav: false,
    isShowLoginModal: false
})

export default createReducer(initialState,{
    [CHANGEPAGENUM]: (state,action) => state.updateIn(['articleQuery', 'currentPage'], value => action.pageNum),
    [TOGGLENAV]: (state,action) => state.set('isShowNav',action.isShowNav),
    [TOGGLELOGINMODAL]: (state,action) => state.set('isShowLoginModal',action.isShowModal)
})
