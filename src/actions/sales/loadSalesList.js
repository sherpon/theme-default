import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import { clearPagination, setPages } from '../pagination'

import { getSales as apiGetSales } from '../../api/sale'
import session from '../../models/session'

/******************************************************************************/
/**
 * @function
 * @name loadSalesList
 * @description Load store's sales list as admin
 * // where's this function used?
 * // - src/containers/salesPage.jsx
 */
export const loadSalesList = () => (dispatch, getState) => {
  dispatch(startFetching())
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiGetSales( userId, storeId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    dispatch(setPages(result.sales, 30))
  })
}
/******************************************************************************/
