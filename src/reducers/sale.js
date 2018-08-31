import {
  CLEAN_SALE,
  LOAD_SALE
} from '../constants/ActionTypes'

const initStateSale = {
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

const sale = (state = initStateSale, action) => {
  switch (action.type) {
    case CLEAN_SALE:
      return initStateSale
    case LOAD_SALE:
      return action.sale
    default:
      return state
  }
}

export default sale
