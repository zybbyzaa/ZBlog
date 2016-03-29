import { REQUEST_ALBUM_LIST, ALBUM_LIST } from './ActionTypes'
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
