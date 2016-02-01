/**
 * a
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 11:34:58
 * @version $Id$
 */

import { INCREASE, DECREASE } from '../constants/constants'

const initialState = {
  number: 1
}

export default function update(state = initialState, action) {
  if(action.type === INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === DECREASE) {
    return { number: state.number - action.amount }
  }
  return state
}

