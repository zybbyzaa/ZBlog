/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-02-01 10:30:26
 * @version $Id$
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createHashHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Home, Article, Album, Music, Message, About } from './components'

const history = createHistory()
const middleware = syncHistory(history)
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
})

const finalCreateStore = applyMiddleware(middleware)(createStore)
const store = finalCreateStore(reducer)
middleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="article" component={Article}/>
          <Route path="album" component={Album}/>
          <Route path="music" component={Music}/>
          <Route path="message" component={Message}/>
          <Route path="about" component={About}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept();
}