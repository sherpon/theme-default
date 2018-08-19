import {
  IS_ADMIN,
  IS_NOT_ADMIN,
  LOGIN,
  LOGOUT
} from '../constants/ActionTypes'

import session from '../models/session'

const getAdminState = () => {
  let initState = false
  if ( session.inUserSession() ) {
    if ( session.getUser().role !== undefined ) {
      if (session.getUser().role === 'admin') {
        initState = true
      }
    }
  }
  return initState
}

const isAdmin = (state = getAdminState(), action) => {
  switch (action.type) {
    case IS_ADMIN:
      return true
    case IS_NOT_ADMIN:
      return false
    case LOGIN:
      return getAdminState()
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default isAdmin
