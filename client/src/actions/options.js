import { CHANGEPAGENUM, TOGGLENAV, TOGGLELOGINMODAL } from './ActionTypes'

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

export function toggleLoginModal(isShowModal) {
    return {
        type: TOGGLELOGINMODAL,
        isShowModal
    }
}
