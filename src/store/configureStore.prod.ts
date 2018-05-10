import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import createSagaMiddleware, { END } from 'redux-saga'
import { rootReducer } from 'store/reducers'
import { fromJS } from 'immutable'
import { createStore, applyMiddleware, compose, Store } from 'redux'

const configureStore = (preloadedState: any = {}) => {
  const history = createHistory()

  const sagaMiddleware = createSagaMiddleware()

  const store: Store<any> = createStore(rootReducer as any, fromJS(preloadedState), compose(
    applyMiddleware( routerMiddleware(history), sagaMiddleware)
  ))

  return { store,thunk, runSaga: sagaMiddleware.run, close: () => store.dispatch(END), history }
}

export default configureStore
