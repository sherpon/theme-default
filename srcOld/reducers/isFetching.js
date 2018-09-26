import {
  FETCH_START,
  FETCH_STOP
} from '../constants/ActionTypes'

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_START:
      return true
    case FETCH_STOP:
      return false
    default:
      return state
  }
}

export default isFetching