import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
//import { getEnv } from '../config'
import history from '../models/history'
import session from '../models/session'
import Strings from '../strings'
import codes from '../constants/codes.json'

import { login as apiLogin, signup as apiSignup } from '../api/login'

export const login = (email, password) => (dispatch, getState) => {
  dispatch(startFetching())

  if (email === "" || password === "") {
    dispatch(stopFetching())
    M.toast({html: Strings(getState().language).loginPage.errorIncompletedForm})
    return false
  }

  apiLogin({ email, password }, (response) => {
    if (response.error === codes.API_USER_LOGIN_NO_FOUND) {
      console.log('error code: ',codes.API_USER_LOGIN_NO_FOUND)
      dispatch(stopFetching())
      M.toast({html: Strings(getState().language).loginPage.errorNotFoundUser})
    } else {
      session.setUser(response.user)
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
  dispatch(startFetching())

  if (
    name === "" ||
    lastname === "" ||
    phone === "" ||
    email === "" ||
    password === ""
  ) {
    dispatch(stopFetching())
    M.toast({html: Strings(getState().language).loginPage.errorIncompletedForm})
  } else {
    apiSignup({ name, lastname, phone, email, password }, (response) => {
      
      if (response.error === codes.API_USER_SIGNUP_EMAIL_EXIST) {
        dispatch(stopFetching())
        M.toast({html: Strings(getState().language).loginPage.errorEmailAlreadyUsed})
      } else {
        session.setUser(response.user)
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
    
}
