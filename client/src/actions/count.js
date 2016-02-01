/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:32:36
 * @version $Id$
 */

import { INCREASE, DECREASE } from '../constants/constants'

export function increase(n) {
  return {
    type: INCREASE,
    amount: n
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}
