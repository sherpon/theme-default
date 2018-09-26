import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
import { setPages } from './pagination'
import session from '../models/session'
import Strings from '../strings'

import {
  updateAccount as apiUpdateAccount,
  updatePassword as apiUpdatePassword,
  loadPurchasesList as apiLoadPurchasesList,
  loadPurchase as apiLoadPurchase
} from '../api/account'

export const updateAccount = (name, lastname, phone, email) => (dispatch, getState) => {
  if (
    name === '' ||
    lastname === '' ||
    phone === '' ||
    email === ''
  ) {
    M.toast({ html: Strings(getState().language).accountPage.errorIncompletedForm })
    return false
  }

  dispatch(startFetching())
  const id = session.getUser().id
  apiUpdateAccount({ id, name, lastname, phone, email }, (response) => {
    if (response.error===null) {
      session.setUser({ id, name, lastname, phone, email })  // let's update the local session information
      dispatch(stopFetching())
      M.toast({ html: Strings(getState().language).accountPage.successUpdate })
    } else {
      dispatch(stopFetching())
      M.toast({ html: Strings(getState().language).accountPage.errorUpdate })
    }
  })
}

export const updatePassword = (password1, password2) => (dispatch, getState) => {
  if (
    password1 === '' ||
    password2 === ''
  ) {
    M.toast({ html: Strings(getState().language).accountPage.errorIncompletedForm })
    return false
  }

  if ( password1 !== password2 ) {
    M.toast({ html: Strings(getState().language).accountPage.errorSamePassword })
    return false
  }

  dispatch(startFetching())
  const id = session.getUser().id
  const password = password1
  apiUpdatePassword({ id, password }, (response) => {
    if (response.error===null) {
      dispatch(stopFetching())
      M.toast({ html: Strings(getState().language).accountPage.successUpdate })
    } else {
      dispatch(stopFetching())
      M.toast({ html: Strings(getState().language).accountPage.errorUpdate })
    }
  })
}

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
