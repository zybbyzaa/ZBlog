import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './ActionTypes'
import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import {saveCookie,getCookie} from '../utils/authService'

const host = __DEVELOPMENT__ ? '//localhost:8088/api/auth/' : '/api/auth/'

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
        return fetch(host + 'local', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(response => response.json().then(json => ({
            json,
            response
        }))).then(({
            json,
            response
        }) => {
            if (!response.ok) {
                return dispatch(loginFailure(json))
            }
            //得到token,并存储
            saveCookie('token', json.token)
                //获取用户信息
            //dispatch(getUserInfo(json.token))
            dispatch(loginSuccess(json.token))
            dispatch(browserHistory.push('/'))
        }).catch(err => {
            //登录异常
            return dispatch(loginFailure(err))
        })
    }

}
