import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'

import {
  uploadImageStore as apiUploadImageStore,
  updateDataTheme as apiUpdateDataTheme
} from '../../api/store'
import session from '../../models/session'

import httpStatusCodes from '../../constants/httpStatusCodes.json'

const _strings = {
  ES:require('./strings/logo.ES.json'),
  EN:require('./strings/logo.EN.json')
}

export const logoSaveButton = (callback) => (dispatch, getState) => {
  const strings = _strings[getState().language]

  const storeId = getState().store.id
  const userId = session.getUser().id
  const logoInput = document.getElementById('logo-modal__input')
  if (!logoInput.files[0]) {
    M.toast({html: strings.errorLogoPicture})
    return false
  }

  dispatch(startFetching())
  let newLogoUrl = ''

  const uploadLogoPicture = () => {
    const timestamp = (new Date()).getTime()
    const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
    apiUploadImageStore(logoInput.files[0], fileName, storeId, (downloadURL) => {
      newLogoUrl = downloadURL
      updateTheme()
    })
  }

  const updateTheme = () => {
    const dataTheme = getState().store.theme.data
    dataTheme.logo = newLogoUrl /** update the logo's url */
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

  uploadLogoPicture()
}
