import {
  EDIT_START,
  EDIT_END
} from '../constants/ActionTypes'

const isEditable = (state = false, action) => {
  switch (action.type) {
    case EDIT_START:
      return true
    case EDIT_END:
      return false
    default:
      return state
  }
}

export default isEditable