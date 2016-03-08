import {
    REQUEST_ARTICLE_LIST,
    ARTICLE_LIST
} from './ActionTypes'
import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const host = __DEVELOPMENT__ ? '//localhost:8088/api/' : '/api/'

function requestArticleList() {
    return {
        type: REQUEST_ARTICLE_LIST
    }
}

function receiveArticleList(json) {
    return {
        type: ARTICLE_LIST,
        articleList: json.data,
        count: json.count
    }
}
export function getArticleList() {
    return (dispatch, getState) => {
        dispatch(requestArticleList())
        const options = getState().options.toJS()

        return fetch(host + 'articleList?' + querystring.stringify(options)).
            then(response => response.json()).
            then(json => {
                return dispatch(receiveArticleList(json))
            })
    }
}
