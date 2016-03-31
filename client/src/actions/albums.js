import { REQUEST_ALBUM_LIST, ALBUM_LIST, REQUEST_ALBUM_DETAIL, ALBUM_DETAIL } from './ActionTypes'
import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const host = __DEVELOPMENT__ ? '//localhost:8088/api/album/' : '/api/album/'

function requestAlbumList() {
    return {
        type: REQUEST_ALBUM_LIST
    }
}

function receiveAlbumList(json) {
    return {
        type: ALBUM_LIST,
        albumList: json.data,
        count: json.count
    }
}
export function getAlbumList() {
    return (dispatch, getState) => {
        dispatch(requestAlbumList())
        const options = getState().options.toJS()

        return fetch(host + 'albumList?' + querystring.stringify(options.albumQuery)).
            then(response => response.json()).
            then(json => {
                return dispatch(receiveAlbumList(json))
            })
    }
}

function requestAlbumDetail() {
    return {
        type: REQUEST_ALBUM_DETAIL
    }
}

function receiveAlbumDetail(json) {
    return {
        type: ALBUM_DETAIL,
        albumDetail: json.data,
        count: json.count
    }
}
export function getAlbumDetail(id) {
    return (dispatch, getState) => {
        dispatch(requestAlbumDetail())

        return fetch(host + 'albumDetail/' + id).
            then(response => response.json()).
            then(json => {
                return dispatch(receiveAlbumDetail(json))
            })
    }
}
