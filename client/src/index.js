import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import showDevTools from './containers/showDevTools'
import {
    App,
    Home,
    Article,
    ArticleList,
    ArticleDetail,
    Album,
    Music,
    Message,
    About,
    Login
} from './containers'
import { redirectToBack, redirectToLogin } from './utils/authService'

const store = configureStore()

// function authPage(nextState, replace) {
//     const isAuth = true
//
//     if(!isAuth) {
//         replace({
//             pathname: '/login',
//             state: { nextPathname: nextState.location.pathname }
//         })
//     }
// }

ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={redirectToLogin}>
            <IndexRoute component={Home}/>
            <Route path="article" component={Article}>
                <IndexRoute component={ArticleList}/>
                <Route path="page/:pageNum" component={ArticleList}/>
                <Route path=":id" component={ArticleDetail}/>
            </Route>
            <Route path="album" component={Album}/>
            <Route path="music" component={Music}/>
            <Route path="about" component={About}/>
        </Route>
        <Route path="/login" component={Login} onEnter={redirectToBack}/>
    </Router>
</Provider>, document.getElementById('root'))

if (process.env.NODE_ENV !== 'production') {
    showDevTools(store)
}
