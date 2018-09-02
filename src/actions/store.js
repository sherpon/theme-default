/**
 * @module actions/store
 * @author Grover Lee
 */

import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
import { setPages } from './pagination'
import Strings from '../strings'
import history from '../models/history'
import session from '../models/session'
import { getRandomString } from '../models/tools'

import {
  updateCategoriesStore as apiUpdateCategoriesStore,
  updateDataTheme as apiUpdateDataTheme,
  updateDataStore as apiUpdateDataStore,
  uploadImageStore as apiUploadImageStore,
  getProducts as apiGetProducts,
  createNewProduct as apiCreateNewProduct,
  getSales as apiGetSales,
  getSale as apiGetSale
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
    apiUploadImageStore(coverInput.files[0], fileName, storeId, (downloadURL) => {
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
    apiUploadImageStore(logoInput.files[0], fileName, storeId, (downloadURL) => {
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

export const categoriesSaveButton = () => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newCategoryName = document.getElementById('categories-modal__name').value
  const newCategoryOrder = document.getElementById('categories-modal__order').value
  const newCategoryType = document.querySelector('input[name="group1"]:checked').value
  const newCategoryParent = document.getElementById('categories-modal__parent').value

  const newCategory = {
    name: newCategoryName,
    order: newCategoryOrder,
    type: newCategoryType,
    parent: newCategoryParent
  }

  dispatch(startFetching())

  apiUpdateCategoriesStore(userId, storeId, newCategory, (response) => {
    // update local dataStore store state, then...
    if (response.error!==null) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      return false
    }

    const categoriesStore = getState().store.categories

    if ( newCategory.type === 'primary' ) {
      /** if is primary, push in the primary array */
      // falta ordenar...
      newCategory.children = []
      categoriesStore.push(newCategory)
    } else {
      /** if is secundary, push in the secundary array */
      // falta ordenar...
      for ( let i = 0 ; i < categoriesStore.length ; i++ ) {
        if (categoriesStore[i].name === newCategory.parent) {
          categoriesStore[i].children.push(newCategory)
        }
      }
    }

    dispatch({
      type: types.UPDATE_CATEGORIES_STORE,
      categoriesStore
    })
    dispatch(stopFetching())
  })

}

/******************************************************************************/
/**
 * @function
 * @name loadProductsList
 * @description Load store's products list as admin
 * // where's this function used?
 * // - src/containers/productsPage.jsx
 */
export const loadProductsList = () => (dispatch, getState) => {
  dispatch(startFetching())
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiGetProducts( userId, storeId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    dispatch(setPages(result.products, 30))
  })
}
/******************************************************************************/

/******************************************************************************/
/**
 * @function
 * @name createNewProduct
 * @description Create store's new product
 * // where's this function used?
 * // - src/containers/productsPage.jsx
 */
export const createNewProduct = () => (dispatch, getState) => {
  const userId = session.getUser().id
  const storeId = getState().store.id

  let newProduct = {
    type: 'item',  // default item
    shortTitle: '',
    longTitle: '',
    tags: [],  // default empty
    categories: [],
    description: '',
    include: '',
    characteristics: '',
    currency: '',
    symbol: '',
    price: 0,
    stock: 0,
    shipping: [],
    attributes: [],
    variations: [],
    picture1: '',
    picture2: '',
    picture3: '',
    picture4: '',
    picture5: '',
    picture6: '',
    picture7: ''
  }

  const inputPicture1 = document.getElementById('product-editor-pictures__picture-1')
  const inputPicture2 = document.getElementById('product-editor-pictures__picture-2')
  const inputPicture3 = document.getElementById('product-editor-pictures__picture-3')
  const inputPicture4 = document.getElementById('product-editor-pictures__picture-4')
  const inputPicture5 = document.getElementById('product-editor-pictures__picture-5')
  const inputPicture6 = document.getElementById('product-editor-pictures__picture-6')
  const inputPicture7 = document.getElementById('product-editor-pictures__picture-7')

  const uploadPicture1 = () => {

    if (!inputPicture1.files[0]) {
      uploadPicture2() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture1.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture1 = downloadURL
        uploadPicture2() /** next ... */
      })
    }
  }

  const uploadPicture2 = () => {

    if (!inputPicture2.files[0]) {
      uploadPicture3() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture2.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture2 = downloadURL
        uploadPicture3() /** next ... */
      })
    }
  }

  const uploadPicture3 = () => {

    if (!inputPicture3.files[0]) {
      uploadPicture4() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture3.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture3 = downloadURL
        uploadPicture4() /** next ... */
      })
    }
  }

  const uploadPicture4 = () => {

    if (!inputPicture4.files[0]) {
      uploadPicture5() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture4.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture4 = downloadURL
        uploadPicture5() /** next ... */
      })
    }
  }

  const uploadPicture5 = () => {

    if (!inputPicture5.files[0]) {
      uploadPicture6() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture5.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture5 = downloadURL
        uploadPicture6() /** next ... */
      })
    }
  }

  const uploadPicture6 = () => {

    if (!inputPicture6.files[0]) {
      uploadPicture7() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture6.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture6 = downloadURL
        uploadPicture7() /** next ... */
      })
    }
  }

  const uploadPicture7 = () => {

    if (!inputPicture7.files[0]) {
      next() /** next ... */
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture7.files[0], fileName, storeId, (downloadURL) => {
        newProduct.picture7 = downloadURL
        next() /** next ... */
      })
    }
  }

  const next = () => {
    newProduct.shortTitle = document.getElementById('product-editor-information__shortTitle').value
    newProduct.longTitle = document.getElementById('product-editor-information__longTitle').value
    //tags: [],  // default empty
    newProduct.categories = [
      JSON.parse( document.getElementById('product-editor-category__category').value )  // give the category object
    ]
    newProduct.description = document.getElementById('product-editor-information__description').value
    newProduct.include = document.getElementById('product-editor-information__include').value
    newProduct.characteristics = document.getElementById('product-editor-information__characteristics').value

    const tmpPriceCurrencyObj = document.getElementById('product-editor-price__currency').value
    newProduct.currency = JSON.parse(tmpPriceCurrencyObj).currency
    newProduct.symbol = JSON.parse(tmpPriceCurrencyObj).symbol

    newProduct.price = document.getElementById('product-editor-price__amount').value
    newProduct.stock = document.getElementById('product-editor-information__stock').value
    /** temporaly, allow just one option of shipping */
    const tmpShippingCurrencyObj = document.getElementById('product-editor-shipping__currency').value
    newProduct.shipping = [
      {
        description: '',
  			currency: JSON.parse(tmpShippingCurrencyObj).currency,
  			symbol: JSON.parse(tmpShippingCurrencyObj).symbol,
  			price: document.getElementById('product-editor-shipping__price').value,
  			days: document.getElementById('product-editor-shipping__time').value,
      }
    ]
    //attributes: [],
    //variations: [],
    apiCreateNewProduct( userId, storeId, newProduct, (result) => {
      if (result.error !== null) {
        /** show error message */
        dispatch(stopFetching())
      }
      //dispatch(setPages(result.products, 30))
      dispatch(stopFetching())
      history.replace({
        pathname: "/" + getState().store.username + '/products',
        state: { some: "state" }
      })
    })
  }

  dispatch(startFetching())
  /** start creating the new product */
  uploadPicture1()

}
/******************************************************************************/

/******************************************************************************/
/**
 * @function
 * @name loadSalesList
 * @description Load store's sales list as admin
 * // where's this function used?
 * // - src/containers/salesPage.jsx
 */
export const loadSalesList = () => (dispatch, getState) => {
  dispatch(startFetching())
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiGetSales( userId, storeId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    dispatch(setPages(result.sales, 30))
  })
}
/******************************************************************************/

/******************************************************************************/
/**
 * @function
 * @name loadSale
 * @description Load store's sales list as admin
 * // where's this function used?
 * // - src/containers/salePage.jsx
 * @param {string} saleId - sale's id
 */
export const loadSale = (saleId) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch({ type: types.CLEAN_SALE })
  const userId = session.getUser().id
  const storeId = getState().store.id
  apiGetSale( userId, storeId, saleId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    //dispatch(setPages(result.sales, 30))
    dispatch({
      type: types.LOAD_SALE,
      sale: result.sale
    })
    dispatch(stopFetching())
  })
}
/******************************************************************************/
