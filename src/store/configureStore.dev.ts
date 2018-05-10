// - Import external components
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import createSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'
import { rootReducer } from 'store/reducers'
import im, { fromJS, Iterable, Map } from 'immutable'
import CommonAPI from 'api/CommonAPI'

const configureStore = (preloadedState: any = {}) => {
  // const history = createHistory()

  // Logger option for transforming immutable js
  const logger = createLogger({
    stateTransformer: (state: Map<string, any>) => {

      return state.toJS()
    }
  })

  const sagaMiddleware = createSagaMiddleware()
  const intialState = Map.isMap(preloadedState) ? preloadedState : fromJS(preloadedState)
  const middlewares = !CommonAPI.checkServer() ? [logger] : []
  middlewares.push(thunk, sagaMiddleware)
  // - Config and create store of redux
  const composeEnhancers = composeWithDevTools({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  })
  const store: Store<any> = createStore(rootReducer as any, intialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ))
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('store/reducers', () => {
      const nextRootReducer = require('store/reducers').rootReducer
      store.replaceReducer(nextRootReducer)
    })
  }
  return { store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END) }
}

export default configureStore
