
import _loginSuccess from './data/loginSuccess.json'
import _loginB from './data/loginB.json'
import _loginError from './data/loginError.json'

const TIMEOUT = 500

export const login = (payload, callback) => {
  console.log('API.login.payload')
  console.log(payload)

  setTimeout( () => {
    if (payload.email==='a' && payload.password==='a') {
      callback(_loginSuccess)
    } else if (payload.email==='b' && payload.password==='b') {
      callback(_loginB)
    } else {
      callback(_loginError)
    }
  },TIMEOUT )
}

export const signup = (payload, callback) => {
  console.log('API.signup.payload')
  console.log(payload)

  setTimeout( () => {
    if (payload.email!=='a') {
      callback(_loginSuccess)
    } else {
      callback(_loginError)
    }
  },TIMEOUT )
}

export const logout = (payload, callback) => {
  console.log('API.logout.payload')
  console.log(payload)

  setTimeout( () => {
    callback(true)
  },TIMEOUT )
}
