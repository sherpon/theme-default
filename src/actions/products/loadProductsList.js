import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import { clearPagination, setPages } from '../pagination'

import { getProducts as apiGetProducts } from '../../api/product'
import session from '../../models/session'

/******************************************************************************/
/**
 * @function
 * @name loadProductsList
 * @description Load store's products list as admin
 * // where's this function used?
 * // - src/containers/productsPage.jsx
 */
export const loadProductsList = () => (dispatch, getState) => {
  dispatch(clearPagination())
  dispatch(startFetching())
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiGetProducts( userId, storeId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    dispatch(setPages(result.products, 30))
  })
}
/******************************************************************************/
