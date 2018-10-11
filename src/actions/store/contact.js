import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import session from '../../models/session'
import {
  updateDataTheme as apiUpdateDataTheme
} from '../../api/store'

import httpStatusCodes from '../../constants/httpStatusCodes.json'

export const contactSaveButton = (callback) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newFacebook = document.getElementById('contact-modal__facebook__input').value
  const newInstagram = document.getElementById('contact-modal__instagram__input').value
  const newWhatsapp = document.getElementById('contact-modal__whatsapp__input').value
  const newPhone = document.getElementById('contact-modal__phone__input').value
  const newEmail = document.getElementById('contact-modal__email__input').value
  let newAddress = document.getElementById('contact-modal__address__input').value

  newAddress = newAddress.split('\n').join(' ')

  //if (!logoInput.files[0]) {
  //  M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
  //  return false
  //}

  dispatch(startFetching())

  const dataTheme = getState().store.theme.data
  dataTheme.contact.facebook = newFacebook
  dataTheme.contact.instagram = newInstagram
  dataTheme.contact.whatsapp = newWhatsapp
  dataTheme.contact.phone = newPhone
  dataTheme.contact.email = newEmail
  dataTheme.contact.address = newAddress

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
