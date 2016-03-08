import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory  } from 'react-router'

import { syncHistory } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

let finalCreateStore
const syncHis = syncHistory(browserHistory )
const logger = createLogger()
const middleware = applyMiddleware(syncHis, thunk, logger)

if(process.env.NODE_ENV === 'production'){
  finalCreateStore = compose(middleware)
}else{
  finalCreateStore = compose(
    middleware,
    DevTools.instrument()
  )
}

export default function configureStore(initialState) {
  const store = finalCreateStore(createStore)(rootReducer, initialState)
  return store
}
