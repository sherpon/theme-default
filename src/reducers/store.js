import {
  LOAD_STORE,
  UPDATE_DATA_THEME
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
  switch (action.type) {
    case LOAD_STORE:
      return action.store
    case UPDATE_DATA_THEME:
      const newStoreState = state
      newStoreState.theme.data = action.dataTheme
      return newStoreState
    default:
      return state
  }
}

export default storeState
