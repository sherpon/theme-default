import { post, put } from './httpRequest.js'

export const login = ( payload, callback ) => post( 'users/login', payload, callback )

export const signup = ( payload, callback ) => post( 'users/signup', payload, callback )

export const logout = (payload, callback) => callback()

export const updateAccount = (userId, payload, callback) => {
  put( 'users/'+userId+'/information', payload, callback )
}

export const updatePassword = (userId, payload, callback) => {
  put( 'users/'+userId+'/password', payload, callback )
}
