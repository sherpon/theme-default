import {
  LOGIN,
  LOGOUT
} from '../constants/ActionTypes'

import session from '../models/session'

const inSession = (state = ( session.inUserSession() ) ? (true) : (false), action) => {
  switch (action.type) {
    case LOGIN:
      return true
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default inSession
