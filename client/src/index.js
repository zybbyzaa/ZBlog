import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistory, routeReducer } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import req from './middleware/req'
import * as reducers from './reducers'
import { App, Home, Article, ArticleList, ArticleDetail, Album, Music, Message, About } from './containers'
import Create from './containers/Create'

const middleware = syncHistory(hashHistory)
const logger = createLogger()
const reducer = combineReducers({
    ...reducers,
    routing: routeReducer
})

const finalCreateStore = applyMiddleware(middleware,thunk,req,logger)(createStore)
const store = finalCreateStore(reducer)

middleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="article" component={Article}>
              <IndexRoute component={ArticleList}/>
              <Route path="page/:pageNum" component={ArticleList}/>
              <Route path=":id" component={ArticleDetail}/>
          </Route>
          <Route path="album" component={Album}/>
          <Route path="music" component={Music}/>
          <Route path="about" component={About}/>
          <Route path="create" component={Create}/>
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
)

// if (module.hot) {
//   module.hot.accept()
// }
