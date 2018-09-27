import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'

import {
  updateDataTheme as apiUpdateDataTheme
} from '../../api/store'

import httpStatusCodes from '../../constants/httpStatusCodes.json'

export const shortDescriptionSaveButton = (callback) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const shortDescriptionInput = document.getElementById('short-description-modal__textarea')
  //if (!logoInput.files[0]) {
  //  M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
  //  return false
  //}

  dispatch(startFetching())
  let newShortDescription = shortDescriptionInput.value
  newShortDescription = newShortDescription.split('\n').join(' ')

  const dataTheme = getState().store.theme.data
  dataTheme.description = newShortDescription
  dataTheme.shortDescription = newShortDescription
  const newDataTheme = dataTheme
  apiUpdateDataTheme(userId, storeId, newDataTheme, (status, response) => {
    // update local dataTheme store state, then...
    if (status!==httpStatusCodes.OK) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      return false
    }
    dispatch({
      type: types.UPDATE_DATA_THEME,
      dataTheme: newDataTheme
    })
    dispatch(stopFetching())
    callback() // call to close the modal
  })

}
