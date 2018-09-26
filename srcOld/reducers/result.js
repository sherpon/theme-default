import { SAVE_RESULT } from '../constants/ActionTypes'

const result = (state = null, action) => {
  switch (action.type) {
    case SAVE_RESULT:
      return action.result
    default:
      return state
  }
}

export default result