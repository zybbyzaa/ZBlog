import { CHANGEPAGENUM, TOGGLENAV } from './ActionTypes'

export function changePageNum(pageNum) {
    return {
        type: CHANGEPAGENUM,
        pageNum
    }
}

export function toggleNav(isShowNav) {
    return {
        type: TOGGLENAV,
        isShowNav
    }
}