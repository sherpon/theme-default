import {
  ADD_TO_CART,
  DELETE_ITEM_CART,
  CLEAN_CART,
  CHOOSE_SHIPPING
} from '../constants/ActionTypes'

import session from '../models/session'

const _item = {
  "id":"",
  "type":"",
  "shortTitle":"",
  "picture":"",
  "currency":"",
  "symbol":"",
  "price":0,
  "amount":0,
  "attributes":[]
  //"attributes":[],
  //"shipping":{}
}

const _initStateCart = {
  "quantity":0,
  "items":[],
  "shipping":{
    "currency":"",
    "symbol":"",
    "price":0,
    "description":"NaN",
    "days":"NaN"
  },
  "subTotal":{
    "currency":"",
    "symbol":"",
    "price":0
  },
  "taxes":{
    "currency":"",
    "symbol":"",
    "price":0
  }, // {'name':'', 'percent':'', 'amountToAdd':''}
  "total":{
    "currency":"",
    "symbol":"",
    "price":0
  }
}

// se carga cart session si hay registrado
const initStateCart = ( session.inCartSession() ) ? ( session.getCart() ) : ( _initStateCart )

const addItemToItemsArray = (_itemsArray, item) => {
  let itemsArray = _itemsArray
  if (itemsArray.length>0) {
    for (let i=0 ; i<itemsArray.length ; i++) {
      let row = itemsArray[i]
      if (row.id===item.id) {
        if (item.type==='clothes') {
          // si es ropa, se verifica que sean de las mismos atributos
          if (
            row.attributes[0]===item.attributes[0] &&
            row.attributes[1]===item.attributes[1] &&
            JSON.stringify(row.shipping) === JSON.stringify(item.shipping)
          ) {
            // si cumple los mismos atributos, solo se suma 'amount'
            row.amount += item.amount
            itemsArray[i] = row
            return itemsArray
          }
        } else if (item.type==='models') {
          // si es por modelos, se verifica que el atributo sea el mismo
          if (
            row.attributes[0]===item.attributes[0] &&
            JSON.stringify(row.shipping) === JSON.stringify(item.shipping)
          ) {
            // si cumple los mismos atributos, solo se suma 'amount'
            row.amount += item.amount
            itemsArray[i] = row
            return itemsArray
          }
        } else {
          /*if ( JSON.stringify(row.shipping) === JSON.stringify(item.shipping) ) {
            // si cumple los mismos atributos, solo se suma 'amount'
            row.amount += item.amount
            itemsArray[i] = row
            return itemsArray
          }*/
          row.amount += item.amount
          itemsArray[i] = row
          return itemsArray
        }
      }
    }
  }
  return [...itemsArray, item]

}

const Cart = (state = initStateCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const quantity = state.quantity + action.item.amount
      const items = addItemToItemsArray(state.items, action.item) //  [...state.items, action.item]
      /*const shipping = {
        "currency": action.item.currency,
        "symbol": action.item.symbol,
        "price": state.shipping.price + (action.item.shipping.price * action.item.amount)
      }*/
      const subTotal = {
        "currency": action.item.currency,
        "symbol": action.item.symbol,
        "price": state.subTotal.price + (action.item.price * action.item.amount)
      }
      // luego se calculan los taxes
      const total = {
        "currency": subTotal.currency,
        "symbol": subTotal.symbol,
        "price": subTotal.price + state.shipping.price
      }
      //return { ...state, quantity, items, shipping, subTotal, total}
      return { ...state, quantity, items, subTotal, total}
    case DELETE_ITEM_CART:
      return { ...state,
        quantity: action.quantity,
        items: action.items,
        //shipping: action.shipping,
        subTotal: action.subTotal,
        total: action.total
      }
    case CHOOSE_SHIPPING:
      return { ...state,
        shipping: action.shipping,
        total: action.total
      }
    case CLEAN_CART:
      return _initStateCart
    //case UPDATE_PRICE:
    //  const { currency, symbol, price } = action
    //  return { ...state, currency, symbol, price }
    default:
      return state
  }
}

export default Cart
