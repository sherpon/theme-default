import * as types from '../../constants/ActionTypes'
import httpStatusCodes from '../../constants/httpStatusCodes.json'
import { startFetching, stopFetching } from '../fetching'
import session from '../../models/session'

import {
  loadPurchasesList as apiLoadPurchasesList,
  loadPurchase as apiLoadPurchase
} from '../../api/sale'

export const loadPurchasesList = () => (dispatch, getState) => {
  dispatch(startFetching())
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiLoadPurchasesList(storeId, userId, (response) => {
    if (response.error!==null) {
      dispatch(stopFetching())
      // show an error message
      return false
    }
    dispatch(setPages(response.sales, 30))
  })
}

export const loadPurchase = (purchaseId) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch({ type: types.CLEAN_PURCHASE })
  const storeId = getState().store.id
  apiLoadPurchase( storeId, purchaseId, (response) => {
    if (response.error!==null) {
      dispatch(stopFetching())
      // show an error message
      return false
    }
    const purchase = response.sale
    dispatch({
      type: types.LOAD_PURCHASE,
      purchase
    })
    dispatch(stopFetching())
  })
}
