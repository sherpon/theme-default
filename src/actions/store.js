import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
import Strings from '../strings'
import session from '../models/session'
import { getRandomString } from '../models/tools'

import {
  updateDataTheme as apiUpdateDataTheme,
  updateDataStore as apiUpdateDataStore,
  uploadImageStore as apiUploadImageStore
} from '../api/store'

export const editStoreSwitch = () => (dispatch, getState) => {
  const isEditable = getState().isEditable
  if (isEditable) {
    dispatch({ type: types.EDIT_END })
  } else {
    dispatch({ type: types.EDIT_START })
  }
}

export const coverSaveButton = (callback) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const coverInput = document.getElementById('cover-modal__input')
  if (!coverInput.files[0]) {
    M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
    return false
  }

  dispatch(startFetching())
  let newCoverUrl = ''

  const uploadCoverPicture = () => {
    const timestamp = (new Date()).getTime()
    const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
    apiUploadImageStore(coverInput, fileName, storeId, (downloadURL) => {
      newCoverUrl = downloadURL
      updateTheme()
    })
  }

  const updateTheme = () => {
    const dataTheme = getState().store.theme.data
    dataTheme.cover = newCoverUrl /** update the cover's url */
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
      callback() // call to close the modal
    })
  }

  uploadCoverPicture()
}

export const logoSaveButton = (callback) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const logoInput = document.getElementById('logo-modal__input')
  if (!logoInput.files[0]) {
    M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
    return false
  }

  dispatch(startFetching())
  let newLogoUrl = ''

  const uploadLogoPicture = () => {
    const timestamp = (new Date()).getTime()
    const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
    apiUploadImageStore(logoInput, fileName, storeId, (downloadURL) => {
      newLogoUrl = downloadURL
      updateTheme()
    })
  }

  const updateTheme = () => {
    const dataTheme = getState().store.theme.data
    dataTheme.logo = newLogoUrl /** update the logo's url */
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
      callback() // call to close the modal
    })
  }

  uploadLogoPicture()
}

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

  const dataTheme = getState().store.theme.data
  dataTheme.description = newShortDescription
  dataTheme.shortDescription = newShortDescription
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
    callback() // call to close the modal
  })

}

export const termsSaveButton = (callback) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const exchangeInput = document.getElementById('terms-modal__exchange')
  const refundInput = document.getElementById('terms-modal__refund')
  //if (!logoInput.files[0]) {
  //  M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
  //  return false
  //}

  dispatch(startFetching())
  let newExchange = exchangeInput.value
  let newRefund = refundInput.value

  const dataTheme = getState().store.theme.data
  dataTheme.terms.exchange = newExchange
  dataTheme.terms.refund = newRefund
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
    callback() // call to close the modal
  })

}

export const contactSaveButton = (callback) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newFacebook = document.getElementById('contact-modal__facebook__input').value
  const newInstagram = document.getElementById('contact-modal__instagram__input').value
  const newWhatsapp = document.getElementById('contact-modal__whatsapp__input').value
  const newPhone = document.getElementById('contact-modal__phone__input').value
  const newEmail = document.getElementById('contact-modal__email__input').value
  const newAddress = document.getElementById('contact-modal__address__input').value
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

/**
 * Create a new homeSection Object and push to the store's sections array
 */
const createNewHomeSection = (pictureMobile, pictureDesktop, pictureAlt, to, dataTheme) => {
  const newHomeSectionObject = {
    pictureMobile,
    pictureDesktop,
    pictureAlt,
    to
  }
  dataTheme.sections.push(newHomeSectionObject)
  return dataTheme
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
    apiUploadImageStore(mobileInput, fileName, storeId, (downloadURL) => {
      pictureMobile = downloadURL
      uploadDesktopPicture()
    })
  }

  const uploadDesktopPicture = () => {
    const timestamp = (new Date()).getTime()
    const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
    apiUploadImageStore(desktopInput, fileName, storeId, (downloadURL) => {
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

export const marketingSaveButton = () => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newAnalytics = document.getElementById('marketing-view__analytics__input').value
  const newFacebookPixel = document.getElementById('marketing-view__facebook-pixel__input').value

  dispatch(startFetching())

  const dataStore = getState().store.data
  dataStore.analytics = newAnalytics
  dataStore.facebookPixel = newFacebookPixel
  const newDataStore = dataStore
  apiUpdateDataStore(userId, storeId, newDataStore, (response) => {
    // update local dataStore store state, then...
    if (response.error!==null) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      return false
    }
    dispatch({
      type: types.UPDATE_DATA_STORE,
      dataStore: newDataStore
    })
    dispatch(stopFetching())
  })

}

export const paymentGatewaySaveButton = () => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newPaymentGatewayName = document.getElementById('payment-gateway-view__name').value
  const newPaymentGatewayPublicKey = document.getElementById('payment-gateway-view__key').value

  dispatch(startFetching())

  const dataStore = getState().store.data
  dataStore.paymentGateway.name = newPaymentGatewayName
  dataStore.paymentGateway.publicKey = newPaymentGatewayPublicKey
  const newDataStore = dataStore
  apiUpdateDataStore(userId, storeId, newDataStore, (response) => {
    // update local dataStore store state, then...
    if (response.error!==null) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      return false
    }
    dispatch({
      type: types.UPDATE_DATA_STORE,
      dataStore: newDataStore
    })
    dispatch(stopFetching())
  })

}
