import { CHANGEPAGENUM, TOGGLENAV, TOGGLELOGINMODAL, SEARCH } from './ActionTypes'
import { push } from 'react-router-redux'

export function changePageNum(pageNum,dataType = 'article') {
    return {
        type: CHANGEPAGENUM,
        pageNum,
        dataType
    }
}

export function toggleNav(isShowNav) {
    return {
        type: TOGGLENAV,
        isShowNav
    }
}

export function toggleLoginModal(isShowModal) {
    return {
        type: TOGGLELOGINMODAL,
        isShowModal
    }
}

export function setKeyword(searchType, text) {
    return {
        type: SEARCH,
        searchType,
        text
    }
}

export function search(search_type, text) {
    return (dispatch, getState) => {
        dispatch(setKeyword(search_type, text))
        return dispatch(push({pathname: '/article', query: {isSearch: true}}))
    }
}
