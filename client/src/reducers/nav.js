/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-10 18:57:10
 * @version $Id$
 */

import { TOGGLENAV, SHOWTOPBTN } from '../constants/nav'

const initialState = {
    isShowMenu: false,
    isShowTopBtn: false
}

export default function nav(state = initialState, action) {
    switch (action.type) {
        case TOGGLENAV:
            return {
                ...state,
                isShowMenu: !state.isShowMenu
            }
        case SHOWTOPBTN:
            return {
                ...state,
                isShowTopBtn: action.isShow
            }
        default:
            return state
    }
}
