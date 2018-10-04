import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'

import {
  uploadImageStore as apiUploadImageStore,
  updateDataTheme as apiUpdateDataTheme
} from '../../api/store'
import session from '../../models/session'

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

export const homeSectionModalPublishButton = (sectionModalId, callback) => (dispatch, getState) => {
  const id = sectionModalId
  const storeId = getState().store.id

  const mobileInput = document.getElementById(`${id}__mobileInput`)
  const desktopInput = document.getElementById(`${id}__desktopInput`)
  const selectDestination = document.getElementById(`${id}__section-modal__destination__select`).value

  if (!mobileInput.files[0]) {
    //console.log("Please select a mobile picture before clicking 'publish'")
    M.toast({html: Strings(getState().language).components.homeSectionModal.errorMobilePicture})
    return false
  }

  if (!desktopInput.files[0]) {
    //console.log("Please select a desktop picture before clicking 'publish'")
    M.toast({html: Strings(getState().language).components.homeSectionModal.errorDesktopPicture})
    return false
  }

  if (selectDestination==='') {
    M.toast({html: Strings(getState().language).components.homeSectionModal.errorDestination})
    return false
  }

  dispatch(startFetching())
  // get alt img
  const selectDestinationIndex = document.getElementById(`${id}__section-modal__destination__select`).selectedIndex
  const pictureAlt = document.getElementById(`${id}__section-modal__destination__select`).options[selectDestinationIndex].text
  let pictureMobile = ''
  let pictureDesktop= ''
  const to = selectDestination

  const uploadMobilePicture = () => {
    const timestamp = (new Date()).getTime()
    const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
    apiUploadImageStore(mobileInput.files[0], fileName, storeId, (downloadURL) => {
      pictureMobile = downloadURL
      uploadDesktopPicture()
    })
  }

  const uploadDesktopPicture = () => {
    const timestamp = (new Date()).getTime()
    const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
    apiUploadImageStore(desktopInput.files[0], fileName, storeId, (downloadURL) => {
      pictureDesktop = downloadURL
      updateTheme()
    })
  }

  const updateTheme = () => {
    /** save new section */
    const dataTheme = getState().store.theme.data
    const newDataTheme = createNewHomeSection(pictureMobile, pictureDesktop, pictureAlt, to, dataTheme)
    const userId = session.getUser().id
    apiUpdateDataTheme(userId, storeId, newDataTheme, (response) => {
      // update local dataTheme store state, then...
      if (response.error!==null) {
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

  /** first, upload the mobile picture... */
  uploadMobilePicture()

}

export const homeSectionDeleteButton = (homeSectionIndex) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  //if (!logoInput.files[0]) {
  //  M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
  //  return false
  //}

  dispatch(startFetching())

  /** delete section's pictures */

  const dataTheme = getState().store.theme.data
  dataTheme.sections.splice(homeSectionIndex, 1)  // delete the section with index...
  const newDataTheme = dataTheme
  apiUpdateDataTheme(userId, storeId, newDataTheme, (response) => {
    // update local dataTheme store state, then...
    if (response.error!==null) {
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
  })

}
