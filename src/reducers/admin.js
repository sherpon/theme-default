import {
  IS_ADMIN,
  IS_NOT_ADMIN
} from '../constants/ActionTypes'

const admin = (state = false, action) => {
  switch (action.type) {
    case IS_ADMIN:
      return true
    case IS_NOT_ADMIN:
      return false
    default:
      return state
  }
}

export default admin