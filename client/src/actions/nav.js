/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-10 18:52:58
 * @version $Id$
 */

import { TOGGLENAV, SHOWTOPBTN } from '../constants/constants'

export function toggleNav() {
  return {
    type: TOGGLENAV
  }
}
export function showTopBtn(isShow) {
  return {
    type: SHOWTOPBTN,
    isShow
  }
}
