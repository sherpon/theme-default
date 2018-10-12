import {
  CLEAR_LATEST_PRODUCTS,
  SET_LATEST_PRODUCTS
} from '../constants/ActionTypes'

const latestProducts = (state = [], action) => {
  switch (action.type) {
    case SET_LATEST_PRODUCTS:
      return action.latestProducts
    case CLEAR_LATEST_PRODUCTS:
      return []
    default:
      return state
  }
}

export default latestProducts
