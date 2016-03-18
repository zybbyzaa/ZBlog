import cookie from 'react-cookie'
let cookieConfig = {}

if(process.env.NODE_ENV === 'production'){
    cookieConfig = {path: '/'}
}

export function saveCookie(name,value) {
    cookie.save(name, value, cookieConfig)
}

export function getCookie(name) {
    return cookie.load(name)
}

export function removeCookie(name) {
    cookie.remove(name, cookieConfig)
}

export function isLogin() {
    return !!cookie.load('token')
}

export function redirectToBack(nextState, replace) {
	//已经登录则不进入
    if (isLogin()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export function redirectToLogin(nextState,replace) {
    if (!isLogin()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export function signOut() {
    cookie.remove('token', cookieConfig)
}
