/**
 * @module actions/store
 * @author Grover Lee
 */

import * as types from '../../constants/ActionTypes'

export const editStoreSwitch = () => (dispatch, getState) => {
  const isEditable = getState().isEditable
  if (isEditable) {
    dispatch({ type: types.EDIT_END })
  } else {
    dispatch({ type: types.EDIT_START })
  }
}
