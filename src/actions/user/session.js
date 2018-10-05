import * as types from '../../constants/ActionTypes'
import httpStatusCodes from '../../constants/httpStatusCodes.json'
import { startFetching, stopFetching } from '../fetching'
import history from '../../models/history'
import session from '../../models/session'
//import codes from '../../constants/codes.json'

import { login as apiLogin, signup as apiSignup } from '../../api/user'

const _strings = {
  ES: {
    errorIncompletedForm: 'Debes completar todos los campos',
		errorNotFoundUser: 'El usuario no se encuentra registrado',
		errorEmailAlreadyUsed: 'El email ya se encuentra registrado'
  },
  EN: {
    errorIncompletedForm: 'Debes completar todos los campos',
		errorNotFoundUser: 'El usuario no se encuentra registrado',
		errorEmailAlreadyUsed: 'El email ya se encuentra registrado'
  }
}

export const login = (email, password) => (dispatch, getState) => {
  const strings = _strings[getState().language]

  if (email === "" || password === "") {
    M.toast({html: strings.errorIncompletedForm})
    return false
  }

  dispatch(startFetching())

  apiLogin({ email, password }, (status, response) => {
    //if (response.error === codes.API_USER_LOGIN_NO_FOUND) {
    if (status!==httpStatusCodes.ACCEPTED) {
      //console.log('error code: ',codes.API_USER_LOGIN_NO_FOUND)
      dispatch(stopFetching())
      M.toast({html: strings.errorNotFoundUser})
    } else {
      session.setUser(response.user)
      dispatch({ type: types.LOGIN })
      if ( localStorage.getItem("NEXT_URL") === null ) {
        dispatch(stopFetching()) // oculta el loading
        history.replace({
          pathname: "/" + getState().store.username + '',
          state: { some: "state" }
        })

      } else {
        var mUrl = localStorage.getItem("NEXT_URL")
        localStorage.removeItem("NEXT_URL")
        history.replace({
          pathname: mUrl,
          state: { some: "state" }
        })
        dispatch(stopFetching()) // oculta el loading
      }

    }
  })
}

export const signup = ( name, lastname, phone, email, password ) => (dispatch, getState) => {
  const strings = _strings[getState().language]
  
  if (
    name === "" ||
    lastname === "" ||
    phone === "" ||
    email === "" ||
    password === ""
  ) {
    M.toast({html: strings.errorIncompletedForm})
    return false
  }

  dispatch(startFetching())

  apiSignup({ name, lastname, phone, email, password }, (status, response) => {

    //if (response.error === codes.API_USER_SIGNUP_EMAIL_EXIST) {
    if (status!==httpStatusCodes.CREATED) {
      dispatch(stopFetching())
      M.toast({html: strings.errorEmailAlreadyUsed})
    } else {
      session.setUser(response.user)
      dispatch({ type: types.LOGIN })
      if ( localStorage.getItem("NEXT_URL") === null ) {
        dispatch(stopFetching()) // oculta el loading
        history.replace({
          pathname: "/" + getState().store.username + '',
          state: { some: "state" }
        })

      } else {
        var mUrl = localStorage.getItem("NEXT_URL")
        localStorage.removeItem("NEXT_URL")
        history.replace({
          pathname: mUrl,
          state: { some: "state" }
        })
        dispatch(stopFetching()) // oculta el loading
      }
    }
  })

}

export const logout = () => (dispatch, getState) => {
  session.unsetUser()
  dispatch({ type: types.LOGOUT })
  history.replace({
    pathname: "/" + getState().store.username + '',
    state: { some: "state" }
  })
}
