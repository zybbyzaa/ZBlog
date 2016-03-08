import { PAGENUM } from './ActionTypes'

export function setPageNum(num) {
    return {
        type: PAGENUM,
        num
    }
}
