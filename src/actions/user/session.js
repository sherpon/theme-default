import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import history from '../../models/history'
import session from '../../models/session'
import Strings from '../../strings'
import codes from '../../constants/codes.json'

import { login as apiLogin, signup as apiSignup } from '../../api/user'

export const login = (email, password) => (dispatch, getState) => {

  if (email === "" || password === "") {
    M.toast({html: Strings(getState().language).loginPage.errorIncompletedForm})
    return false
  }

  dispatch(startFetching())

  apiLogin({ email, password }, (response) => {
    if (response.error === codes.API_USER_LOGIN_NO_FOUND) {
      console.log('error code: ',codes.API_USER_LOGIN_NO_FOUND)
      dispatch(stopFetching())
      M.toast({html: Strings(getState().language).loginPage.errorNotFoundUser})
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

  if (
    name === "" ||
    lastname === "" ||
    phone === "" ||
    email === "" ||
    password === ""
  ) {
    M.toast({html: Strings(getState().language).loginPage.errorIncompletedForm})
    return false
  }

  dispatch(startFetching())

  apiSignup({ name, lastname, phone, email, password }, (response) => {

    if (response.error === codes.API_USER_SIGNUP_EMAIL_EXIST) {
      dispatch(stopFetching())
      M.toast({html: Strings(getState().language).loginPage.errorEmailAlreadyUsed})
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
