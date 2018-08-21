import {
  LOAD_STORE,
  UPDATE_DATA_THEME
} from '../constants/ActionTypes'

const initStateStore = {
  'name':'',
  'username':'',
  'shortDescription':'',
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
    case LOAD_STORE:
      const newStoreState = state
      newStoreState.theme.data = action.dataTheme
      return newStoreState
    default:
      return state
  }
}

export default storeState
