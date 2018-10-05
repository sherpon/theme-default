import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import session from '../../models/session'

import { getSale as apiGetSale } from '../../api/sale'

/******************************************************************************/
/**
 * @function
 * @name loadSale
 * @description Load store's sales list as admin
 * // where's this function used?
 * // - src/containers/salePage.jsx
 * @param {string} saleId - sale's id
 */
export const loadSale = (saleId) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch({ type: types.CLEAN_SALE })
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiGetSale( userId, storeId, saleId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    //dispatch(setPages(result.sales, 30))
    dispatch({
      type: types.LOAD_SALE,
      sale: result.sale
    })
    dispatch(stopFetching())
  })
}
/******************************************************************************/
