import * as types from '../../constants/ActionTypes'
import httpStatusCodes from '../../constants/httpStatusCodes.json'
import { startFetching, stopFetching } from '../fetching'
import history from '../../models/history'
import session from '../../models/session'

import {
  updateAccount as apiUpdateAccount,
  updatePassword as apiUpdatePassword
} from '../../api/user'

const _strings = {
  ES:require('./strings/update.ES.json'),
  EN:require('./strings/update.EN.json')
}

export const updateAccount = (name, lastname, phone, email) => (dispatch, getState) => {
  const strings = _strings[getState().language]
  if (
    name === '' ||
    lastname === '' ||
    phone === '' ||
    email === ''
  ) {
    M.toast({ html: strings.errorIncompletedForm })
    return false
  }

  dispatch(startFetching())
  const id = session.getUser().id
  apiUpdateAccount( id, { name, lastname, phone, email } , (status, response) => {
    if (status!==httpStatusCodes.OK) {
      session.setUser({ id, name, lastname, phone, email })  // let's update the local session information
      dispatch(stopFetching())
      M.toast({ html: strings.successUpdate })
    } else {
      dispatch(stopFetching())
      M.toast({ html: strings.errorUpdate })
    }
  })
}

export const updatePassword = (password1, password2) => (dispatch, getState) => {
  const strings = _strings[getState().language]
  if (
    password1 === '' ||
    password2 === ''
  ) {
    M.toast({ html: strings.errorIncompletedForm })
    return false
  }

  if ( password1 !== password2 ) {
    M.toast({ html: strings.errorSamePassword })
    return false
  }

  dispatch(startFetching())
  const id = session.getUser().id
  const password = password1
  apiUpdatePassword( id, { password } , (status, response) => {
    if (status!==httpStatusCodes.OK) {
      dispatch(stopFetching())
      M.toast({ html: strings.successUpdate })
    } else {
      dispatch(stopFetching())
      M.toast({ html: strings.errorUpdate })
    }
  })
}
