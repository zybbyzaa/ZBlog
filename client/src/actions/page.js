import { PAGENUM } from '../constants/page'

export function setPageNum(num) {
    return {
        type: PAGENUM,
        num
    }
}
