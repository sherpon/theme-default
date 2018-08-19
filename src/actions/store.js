import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'

export const editStoreSwitch = () => (dispatch, getState) => {
  const isEditable = getState().isEditable
  if (isEditable) {
    dispatch({ type: types.EDIT_END })
  } else {
    dispatch({ type: types.EDIT_START })
  }
}
