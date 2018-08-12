const USER_SESSION_NAME = 'userSession'

const setUser = ( mUser ) => localStorage.setItem(USER_SESSION_NAME,JSON.stringify(mUser))

const getUser = () => ( JSON.parse(localStorage.getItem(USER_SESSION_NAME)) )

const unsetUser = () => localStorage.removeItem(USER_SESSION_NAME)

const inUserSession = () => {
  if ( localStorage.getItem(USER_SESSION_NAME) === null ) {
    return false
  } else {
    return true
  }
}

const CART_NAME = 'cartSession'

const setCart = ( cart ) => localStorage.setItem(CART_NAME,JSON.stringify(cart))

const getCart = () => ( JSON.parse(localStorage.getItem(CART_NAME)) )

const unsetCart = () => localStorage.removeItem(CART_NAME)

const inCartSession = () => {
  if ( localStorage.getItem(CART_NAME) === null ) {
    return false
  } else {
    return true
  }
}

export default {
  setUser,
  getUser,
  unsetUser,
  inUserSession,
  setCart,
  getCart,
  unsetCart,
  inCartSession
}
