import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    USERINFO_SUCCESS,
    USERINFO_FAILURE,
    LOGOUT_USER
} from '../actions/ActionTypes'
import {
    saveCookie,
    getCookie
} from '../utils/authService'
import {
    createReducer
} from 'redux-immutablejs'
import {
    fromJS,
    Map,
    List
} from 'immutable'

const initialState = fromJS({
    token: getCookie('token') || null,
    user: null,
    errMsg: null
})

export default createReducer(initialState, {
    [LOGIN_SUCCESS]: (state, action) => {
        return state.merge({
            errMsg: null,
            token: action.token
        })
    },
    [LOGIN_FAILURE]: (state, action) => state.set('errMsg', action.errMsg),
    [LOGOUT_USER]: (state,action)=> initialState.set('token',null),
    [USERINFO_SUCCESS]: (state,action)=>{
        return state.merge({
            errMsg: null,
            user: action.user
        })
    },
    [USERINFO_FAILURE]: (state, action) => state.set('user', null)
})
