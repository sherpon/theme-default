import { combineReducers } from 'redux'
import isFetching from './isFetching'
import isEditable from './isEditable'
import inSession from './inSession'
import isAdmin from './isAdmin'
import pagination from './pagination'
import language from './language'
import product from './product'
import cart from './cart'
import sale from './sale'
import store from './store'

export default combineReducers({
  isFetching,
  isEditable,
  inSession,
  isAdmin,
  pagination,
  language,
  product,
  cart,
  sale,
  store
})
