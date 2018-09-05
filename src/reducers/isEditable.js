import {
  EDIT_START,
  EDIT_END,
  LOGIN,
  LOGOUT
} from '../constants/ActionTypes'

import session from '../models/session'

const isEditable = (state = session.isAdmin(), action) => {
  switch (action.type) {
    case EDIT_START:
      return true
    case EDIT_END:
      return false
    case LOGIN:
      return session.isAdmin()
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default isEditable
