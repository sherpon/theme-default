import {
  EDIT_START,
  EDIT_END,
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

const isEditable = (state = getAdminState(), action) => {
  switch (action.type) {
    case EDIT_START:
      return true
    case EDIT_END:
      return false
    case LOGIN:
      return getAdminState()
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default isEditable
