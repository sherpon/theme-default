import { startFetching, stopFetching } from './fetching'
import { setPages } from './pagination'
import session from '../models/session'
import Strings from '../strings'

import {
  updateAccount as apiUpdateAccount,
  updatePassword as apiUpdatePassword,
  loadPurchasesList as apiLoadPurchasesList
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
  apiUpdatePassword({ id, password1 }, (response) => {
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
  apiLoadPurchasesList({ storeId, userId }, (_list) => {
    dispatch(setPages(_list, 30))
  })
}
