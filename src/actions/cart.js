import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
import history from '../models/history'
import session from '../models/session'

const updateCart = () => (dispatch, getState) => {
  session.setCart( getState().cart )
  dispatch(stopFetching())
}

// recibe el index de item en el array del cart
export const deleteItemCart = (index) => (dispatch, getState) => {
  dispatch(startFetching())
  const { cart } = getState()
  let { quantity, items, shipping, subTotal, taxes, total } = cart

  const _item = cart.items[index]

  quantity -= _item.amount
  items.splice(index, 1)
  shipping.price -= _item.amount * _item.shipping.price
  subTotal.price -= _item.amount * _item.price
  //taxes
  total.price -= ( (_item.amount * _item.shipping.price) + (_item.amount * _item.price) )

  dispatch({
    type: types.DELETE_ITEM_CART,
    quantity,
    items,
    shipping,
    subTotal,
    total
  })

  return dispatch(updateCart())
}

export const checkout = () => (dispatch, getState) => {
  const checkoutUrl = `/${getState().storeState.username}/checkout`
  const loginUrl = `/${getState().storeState.username}/login`

  if ( session.inUserSession() ) {
    // si existe session de usuario manda al checkout
    history.push({
      pathname: checkoutUrl,
      state: { some: "state" }
    })
  } else {
    // de lo contrario lo manda al login, luego lo envia al checkout
    localStorage.setItem("NEXT_URL", checkoutUrl)
    history.push({
      pathname: loginUrl,
      state: { some: "state" }
    })
  }
}
