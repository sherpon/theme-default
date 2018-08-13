import { combineReducers } from 'redux'
import isFetching from './isFetching'
import isResultLoaded from './isResultLoaded'
import isEditable from './isEditable'
import inSession from './inSession'
import admin from './admin'
import pagination from './pagination'
import result from './result'
import language from './language'
import item from './item'
import cart from './cart'
import store from './store'

export default combineReducers({
  isFetching,
  isResultLoaded,
  isEditable,
  inSession,
  admin,
  pagination,
  result,
  language,
  item,
  cart,
  store
})
