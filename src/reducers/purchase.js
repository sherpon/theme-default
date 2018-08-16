import {
  CLEAN_PURCHASE,
  LOAD_PURCHASE
} from '../constants/ActionTypes'

const initStatePurchase = {
  "id":"",
  "timestamp":0,
  "state":"pending",
  "history":[],
  "user":{},
  "cart":{
    "quantity": 1,
    "items": [],
    "shipping": {
      "currency": "USD",
      "symbol": "$",
      "price": 5
    },
    "subTotal": {
      "currency": "USD",
      "symbol": "$",
      "price": 50
    },
    "taxes": [],
    "total": {
      "currency": "USD",
      "symbol": "$",
      "price": 55
    }
  },
  "payment":{},
  "shipping":{},
  "billing":{}
}

const purchase = (state = initStatePurchase, action) => {
  switch (action.type) {
    case CLEAN_PURCHASE:
      return initStatePurchase
    case LOAD_PURCHASE:
      return action.purchase
    default:
      return state
  }
}

export default purchase
