import { SUCCESS_ADD_COMMENT, FAILURE_ADD_COMMENT, COMMENT_LIST, COMMENT_LIST_MORE, SUCCESS_ADD_REPLY, FAILURE_ADD_REPLY} from './ActionTypes'
import fetch from 'isomorphic-fetch'
import { getCookie } from '../utils/authService'

const host = __DEVELOPMENT__ ? '//localhost:8088/api/comment/' : '/api/comment/'

function receiveAddComment(comment) {
    return {
        type: SUCCESS_ADD_COMMENT,
        comment: comment
    }
}

function failureAddComment(err) {
    return {
        type: FAILURE_ADD_COMMENT,
        errMsg: err.error_msg || '添加评论失败'
    }
}
export function addComment(comment) {
    return (dispatch, getState) => {
        return fetch(host + 'addComment', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(comment)
        }).then(response => response.json().then(json => ({
            json,
            response
        }))).then(({
            json,
            response
        }) => {
            if (!response.ok) {
                return dispatch(failureAddComment(json))
            }
            return dispatch(receiveAddComment(json.data))
        }).catch(e => {
            return dispatch(failureAddComment(e))
        })
    }
}

function addCommentList(json) {
    return {
        type: COMMENT_LIST_MORE,
        commentList: json.data,
        commentCount: json.count
    }
}
function receiveCommentList(json) {
    return {
        type: COMMENT_LIST,
        commentList: json.data,
        commentCount: json.count
    }
}
export function getCommentList(id,cur,isAdd) {
    return (dispatch, getState) => {
        return fetch(host + 'getCommentList/' + id + '?count=' + cur ).then(
            response => response.json()).then(
                json => {
                    return isAdd ? dispatch(addCommentList(json)) : dispatch(receiveCommentList(json))
                })
    }
}
function receiveAddReply(cid, replys) {
    return {
        type: SUCCESS_ADD_REPLY,
        cid: cid,
        replys: replys
    }
}

function failureAddReply(err) {
    return {
        type: FAILURE_ADD_REPLY,
        errMsg: err.error_msg || '添加回复失败'
    }
}
export function addReply(cid, reply) {
    return (dispatch, getState) => {
        return fetch(host + 'addReply/' + cid, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(reply)
        }).then(response => response.json().then(json => ({
            json,
            response
        }))).then(({
                json,
                response
            }) => {
            if (!response.ok) {
                return dispatch(failureAddReply(json))
            }
            return dispatch(receiveAddReply(cid, json.data))
        }).catch(e => {
            return dispatch(failureAddReply(e))
        })
    }
}
