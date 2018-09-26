import {
  IS_ADMIN,
  IS_NOT_ADMIN,
  LOGIN,
  LOGOUT
} from '../constants/ActionTypes'

import session from '../models/session'

const isAdmin = (state = session.isAdmin(), action) => {
  switch (action.type) {
    case IS_ADMIN:
      return true
    case IS_NOT_ADMIN:
      return false
    case LOGIN:
      return session.isAdmin()
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default isAdmin
