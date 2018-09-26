import { 
  CLEAR_ITEM, 
  SAVE_ITEM,
  SET_WARNING,
  UPDATE_PRICE
} from '../constants/ActionTypes'

const initStateItem = {
  "id":"",
  "type":"",
  "shortTitle":"",
  "longTitle":"",
  "tags":"",
  "categories":[
    {
      "name":"Na",
      "orden":0,
      "type":"primary",
      "parent":"Na"
    }
  ],
  "shipping":[],
  "attributes":[],
  "variations":[],
  "picture1":"",
  "picture2":"",
  "picture3":"",
  "picture4":"",
  "picture5":"",
  "picture6":"",
  "picture7":"",
  "warning":""
}

const item = (state = initStateItem, action) => {
  switch (action.type) {
    case CLEAR_ITEM:
      return initStateItem
    case SAVE_ITEM:
      return action.item
    case SET_WARNING:
      const warning = action.warning
      return { ...state, warning }
      //return Object.assign({}, state, {warning})
    case UPDATE_PRICE:
      const { currency, symbol, price } = action
      return { ...state, currency, symbol, price }
      //return Object.assign({}, state, { currency, symbol, price })
    default:
      return state
  }
}

export default item