/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-10 18:57:10
 * @version $Id$
 */

import { TOGGLEMMENU } from '../constants/constants'

const initialState = {
  isShowMenu: false
}

export default function toggle(state = initialState, action) {
  if(action.type === TOGGLEMMENU) {
  	console.log("toggle");
    return { isShowMenu: !state.isShowMenu}
  }
  return state
}