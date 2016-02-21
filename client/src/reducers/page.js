import { PAGENUM } from '../constants/page'

const initialState = {
    currentPage: 1
}

export default function nav(state = initialState, action = {}) {
    switch (action.type) {
        case PAGENUM:
            return {
                ...state,
                currentPage: action.num
            }
        default:
            return state
    }
}
