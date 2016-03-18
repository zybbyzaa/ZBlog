import cookie from 'react-cookie'

export function saveCookie(name,value) {
    cookie.save(name, value)
    console.log(getCookie(name))
}

export function getCookie(name) {
    return cookie.load(name)
}

export function removeCookie(name) {
    cookie.remove(name)
}

export function isLogin() {
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
    cookie.remove('token')
    console.log('cookie removed')
}
