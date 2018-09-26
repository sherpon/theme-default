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

/**
 * @function
 * @name isAdmin
 * @description check if the user is admin of the store.
 * @return {bool} Returns true if is admin, else returns false
 */
const isAdmin = () => {
  let _isAdmin = false
  if ( inUserSession() ) {
    if ( getUser().publicKey !== undefined ) {
      if (getUser().publicKey === window._store.publicKey) {
        _isAdmin = true
      }
    }
  }
  return _isAdmin
}

const CART_NAME = 'cartId'

const setCart = (  cart ) => localStorage.setItem(CART_NAME+_store.id,JSON.stringify(cart))

const getCart = () => ( JSON.parse(localStorage.getItem(CART_NAME+_store.id)) )

const unsetCart = () => localStorage.removeItem(CART_NAME+_store.id)

const inCartSession = () => {
  if ( localStorage.getItem(CART_NAME+_store.id) === null ) {
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
  isAdmin,
  setCart,
  getCart,
  unsetCart,
  inCartSession
}
