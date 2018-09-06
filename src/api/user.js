import { post } from './post.js'

export const login = ( payload, callback ) => post( "user/login", payload, callback )

export const signup = ( payload, callback ) => post( "user/signup", payload, callback )

export const logout = (payload, callback) => callback()
