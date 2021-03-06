import { ARTICLES_LOAD, ARTICLES_LOAD_SUCCESS, ARTICLES_LOAD_FAIL } from '../constants/articles'

const initialState = {
    articles_loading: false,
    articles: [],
    articles_count: 0,
    error: ''
}

export default function articles(state = initialState, action = {}) {
    const { type, result, error } = action

    switch (type) {
        case ARTICLES_LOAD:
            return {
                ...state,
                articles_loading: true
            }
        case ARTICLES_LOAD_SUCCESS:
            return {
                ...state,
                articles_loading: false,
                articles: result.articles,
                articles_count: result.count
            }
        case ARTICLES_LOAD_FAIL:
            return {
                ...state,
                articles_loading: false,
                error: error
            }
        default:
            return state
    }
}
