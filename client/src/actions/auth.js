import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    USERINFO_SUCCESS,
    USERINFO_FAILURE,
    LOGOUT_USER
} from './ActionTypes'
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import {saveCookie,getCookie,signOut} from '../utils/authService'

const host = __DEVELOPMENT__ ? '//localhost:8088/api/' : '/api/'

//登录
function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token: token
    }
}

function loginFailure(err) {
    return {
        type: LOGIN_FAILURE,
        errMsg: err.error_msg || '登录失败'
    }
}
export function localLogin(userInfo) {
    return (dispatch, getState) => {
        return fetch(host + 'auth/local', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(response => response.json().then(json => ({ json, response })
        )).then(({ json, response }) => {
            if (!response.ok) {
                return dispatch(loginFailure(json))
            }
            saveCookie('token', json.token)
            dispatch(getUserInfo(json.token))
            dispatch(loginSuccess(json.token))
            dispatch(push('/'))
        }).catch(err => {
            return dispatch(loginFailure(err))
        })
    }

}
//获取用户信息
function receiveUserInfo(user) {
    return {
        type: USERINFO_SUCCESS,
        user: user
    }
}

function failureUserInfo() {
    return {
        type: USERINFO_FAILURE
    }
}
export function getUserInfo(token) {
    return (dispatch, getState) => {
        return fetch(host + 'users/getUserInfo', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json().then(json => ({
            json,
            response
        }))).then(({
                json,
                response
            }) => {
            if (!response.ok) {
                console.log('err1')
                return dispatch(failureUserInfo())
            }
            return dispatch(receiveUserInfo(json))
        }).catch(err => {
                //登录异常
            return dispatch(failureUserInfo())
        })
    }
}
export function logout() {
    return dispatch => {
        signOut()
        dispatch({type: LOGOUT_USER})
        dispatch(push('/login'))
    }
}
