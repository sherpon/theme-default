import { combineReducers } from 'redux'
import isFetching from './isFetching'
import isResultLoaded from './isResultLoaded'
import isEditable from './isEditable'
import inSession from './inSession'
import isAdmin from './isAdmin'
import pagination from './pagination'
import result from './result'
import language from './language'
import purchase from './purchase'
import item from './item'
import cart from './cart'
import store from './store'

export default combineReducers({
  isFetching,
  isResultLoaded,
  isEditable,
  inSession,
  isAdmin,
  pagination,
  result,
  language,
  purchase,
  item,
  cart,
  store
})
