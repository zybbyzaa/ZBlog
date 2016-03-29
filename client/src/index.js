import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import showDevTools from './containers/showDevTools'
import { App, Home, Article, ArticleList, ArticleDetail, Album, AlbumList, Music, Message, About, Login } from './containers'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="article" component={Article}>
                    <IndexRoute component={ArticleList}/>
                    <Route path="page/:pageNum" component={ArticleList}/>
                    <Route path=":id" component={ArticleDetail}/>
                </Route>
                <Route path="album" component={Album}>
                    <IndexRoute component={AlbumList}/>
                    <Route path="page/:pageNum" component={AlbumList}/>
                </Route>
                <Route path="music" component={Music}/>
                <Route path="about" component={About}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production') {
    showDevTools(store)
}
