import {
  LOAD_STORE,
  UPDATE_DATA_THEME,
  UPDATE_DATA_STORE
} from '../constants/ActionTypes'

const initStateStore = {
  'name':'',
  'username':'',
  'categories':[],
  'theme':{
    'data':{
      'shortDescription':'',
      'description':'',
      'cover':'/images/store/placeholderCover.png',
      'logo':'/images/store/placeholderLogo.png',
      'contact':{}
    }
  }
}

const storeState = (state = initStateStore, action) => {
  let newStoreState
  switch (action.type) {
    case LOAD_STORE:
      return action.store
    case UPDATE_DATA_THEME:
      newStoreState = state
      newStoreState.theme.data = action.dataTheme
      return newStoreState
    case UPDATE_DATA_STORE:
      newStoreState = state
      newStoreState.data = action.dataStore
      return newStoreState
    default:
      return state
  }
}

export default storeState
