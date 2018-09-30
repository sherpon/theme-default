import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import { clearPagination, setPages } from '../pagination'

import { getItemsByCategory } from '../../api/category'

export const loadCategory = (category) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch(clearPagination())
  const { store } = getState()
  getItemsByCategory(store.id, category.toLowerCase(), (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    const productsList = result.products
    dispatch(setPages(productsList, 30))
  })
}
