import cookie from 'react-cookie'

const cookieConfig = {
    maxage: 86400,
    httpOnly: true,
    path: '/',
    overwrite: true,
    signed: true
}

export function saveCookie(name,value) {
    cookie.save(name, value, {path: '/', maxAge: 2 * 3600 * 1000, domain: 'localhost'})
}

export function getCookie(name) {
    return cookie.load(name)
}

export function removeCookie(name) {
    cookie.remove(name, {path: '/', maxAge: 2 * 3600 * 1000})
}

export function isLogin() {
    console.log(cookie.load('token'))
    return !!cookie.load('token')
}

// export function redirectToBack(nextState, replace) {
// 	//已经登录则不进入
//     if (isLogin()) {
//         replace({
//             pathname: '/',
//             state: { nextPathname: nextState.location.pathname }
//         })
//     }
// }
//
// export function redirectToLogin(nextState,replace) {
//     if (!isLogin()) {
//         replace({
//             pathname: '/login',
//             state: { nextPathname: nextState.location.pathname }
//         })
//     }
// }

export function signOut() {
    removeCookie('token')
    console.log('cookie removed')
}
