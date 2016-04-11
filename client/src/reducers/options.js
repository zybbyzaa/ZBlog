import { CHANGEPAGENUM, TOGGLENAV, TOGGLELOGINMODAL, SEARCH } from '../actions/ActionTypes'
import { createReducer } from 'redux-immutablejs'
import {Map, List, fromJS} from 'immutable'

const initialState = fromJS({
    articleQuery: {currentPage: 1, keyword: ''},
    albumQuery: {currentPage: 1, keyword: ''},
    songQuery: {currentPage: 1, keyword: ''},
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
    [TOGGLELOGINMODAL]: (state,action) => state.set('isShowLoginModal',action.isShowModal),
    [SEARCH]: (state,action) => {
        switch (action.searchType) {
            case 'article':
                return state.updateIn(['articleQuery', 'keyword'], value => action.text)
            case 'album':
                return state.updateIn(['albumQuery', 'keyword'], value => action.text)
            case 'song':
                return state.updateIn(['songQuery', 'keyword'], value => action.text)
        }
    }
})
