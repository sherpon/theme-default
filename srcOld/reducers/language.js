import {
  CHANGE_LANGUAGE_TO_EN,
  CHANGE_LANGUAGE_TO_ES
} from '../constants/ActionTypes'

const language = (state = 'ES', action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE_TO_EN:
      return 'EN'
    case CHANGE_LANGUAGE_TO_ES:
      return 'ES'
    default:
      return 'ES'
  }
}

export default language