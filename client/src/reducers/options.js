import { CHANGEPAGENUM, TOGGLENAV, TOGGLELOGINMODAL } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map, List, fromJS} from 'immutable'

const initialState = fromJS({
    articleQuery: {currentPage: 1},
    albumQuery: {currentPage: 1},
    songQuery: {currentPage: 1},
    isShowNav: false,
    isShowLoginModal: false
})

export default createReducer(initialState,{
    [CHANGEPAGENUM]: (state,action) => {
        switch (action.dataType) {
            case 'article':
                return state.updateIn(['articleQuery', 'currentPage'], value => action.pageNum)
            case 'album':
                return state.updateIn(['albumQuery', 'currentPage'], value => action.pageNum)
            case 'song':
                return state.updateIn(['songQuery', 'currentPage'], value => action.pageNum)
            default:
                break

        }
    },
    [TOGGLENAV]: (state,action) => state.set('isShowNav',action.isShowNav),
    [TOGGLELOGINMODAL]: (state,action) => state.set('isShowLoginModal',action.isShowModal)
})
