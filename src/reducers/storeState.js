import { LOAD_STORE } from '../constants/ActionTypes'

const initStateStore = {
  'name':'',
  'username':'',
  'shortdescription':'',
  'description':'',
  'cover':'/images/store/placeholderCover.png',
  'logo':'/images/store/placeholderLogo.png',
  'contact':{},
  'categories':[],
  'role':'guest'
}

const storeState = (state = initStateStore, action) => {
  switch (action.type) {
    case LOAD_STORE:
      return action.store
    default:
      return state
  }
}

export default storeState