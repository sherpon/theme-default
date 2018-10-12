import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'

import { getLatestProductsList as apiGetLatestProductsList } from '../../models/firebase/firestore/product'

/******************************************************************************/
/**
 * @function
 * @name loadLatestProductsList
 * @description Load store's products list as admin
 * // where's this function used?
 * // - src/containers/productsPage.jsx
 */
export const loadLatestProductsList = () => (dispatch, getState) => {
  //dispatch(startFetching())
  const storeId = getState().store.id
  apiGetLatestProductsList( storeId, (result) => {
    if (result.error !== null) {
      /** show error message */
      //dispatch(stopFetching())
    }
    dispatch({
      type: types.SET_LATEST_PRODUCTS,
      latestProducts: result.products
    })
  })
}
/******************************************************************************/
