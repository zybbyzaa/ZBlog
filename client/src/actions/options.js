import { CHANGEPAGENUM, TOGGLENAV, TOGGLELOGINMODAL } from './ActionTypes'

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
