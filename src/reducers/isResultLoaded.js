import {
  RESULT_IS_LOADED,
  RESULT_IS_NOT_LOADED
} from '../constants/ActionTypes'

const isResultLoaded = (state = false, action) => {
  switch (action.type) {
    case RESULT_IS_LOADED:
      return true
    case RESULT_IS_NOT_LOADED:
      return false
    default:
      return state
  }
}

export default isResultLoaded