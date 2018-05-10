import { localizeReducer as locale } from 'react-localize-redux'
import {
  combineReducers
} from 'redux-immutable'

// - Import reducers
import { moderatorReducer as moderator } from '../redux-moderator'
import { globalReducer } from './global'
import { serverReducer } from './server'
import { routerReducer, routerMiddleware } from 'react-router-redux'
// - Reducers
export const rootReducer = combineReducers({
  server: serverReducer,
  router: routerReducer,
  global: globalReducer
} as any)