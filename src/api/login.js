import _loginSuccess from './data/loginSuccess.json'
import _loginError from './data/loginError.json'

const TIMEOUT = 500

export const login = (payload, callback) => {
  setTimeout( () => { 
    if (payload.email==='a' && payload.password==='a') {
      callback(_loginSuccess)
    } else {
      callback(_loginError)
    }
  },TIMEOUT )
}

export const signup = (payload, callback) => {
  setTimeout( () => {
    if (payload.email!=='a') {
      callback(_loginSuccess)
    } else {
      callback(_loginError)
    }
  },TIMEOUT )
}