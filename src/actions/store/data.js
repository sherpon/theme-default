import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import httpStatusCodes from '../../constants/httpStatusCodes.json'

import {
  updateDataStore as apiUpdateDataStore
} from '../../api/store'
import session from '../../models/session'

const strings = {
  ES:require('./strings/data.ES.json'),
  EN:require('./strings/data.EN.json')
}

export const paymentGatewaySaveButton = () => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newPaymentGatewayName = document.getElementById('payment-gateway-view__name').value
  const newPaymentGatewayPublicKey = document.getElementById('payment-gateway-view__public-key').value
  const newPaymentGatewayPrivateKey = document.getElementById('payment-gateway-view__private-key').value

  dispatch(startFetching())

  const dataStore = getState().store.data
  dataStore.paymentGateway.name = newPaymentGatewayName
  dataStore.paymentGateway.publicKey = newPaymentGatewayPublicKey
  dataStore.paymentGateway.privateKey = newPaymentGatewayPrivateKey
  const newDataStore = dataStore
  apiUpdateDataStore(userId, storeId, newDataStore, (status, response) => {
    // update local dataStore store state, then...
    if (status!==httpStatusCodes.OK) {
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
    M.toast({html: strings[getState().language].successUpdate})
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
  apiUpdateDataStore(userId, storeId, newDataStore, (status, response) => {
    // update local dataStore store state, then...
    if (status!==httpStatusCodes.OK) {
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
    M.toast({html: strings[getState().language].successUpdate})
  })

}

export const shippingCreateButton = () => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id

  const shippingDescription = document.getElementById('shipping-modal__description').value
  if ( shippingDescription === '' ) {
    M.toast({html: strings[getState().language].errorShippingDescription})
    return false
  }

  const shippingPrice = document.getElementById('shipping-modal__price').value
  if ( shippingPrice === '' ) {
    M.toast({html: strings[getState().language].errorShippingPrice})
    return false
  }

  const shippingCurrencyStr = document.getElementById('shipping-modal__currency').value
  if ( shippingCurrencyStr === '{}' ) {
    M.toast({html: strings[getState().language].errorShippingCurrency})
    return false
  }

  const shippingTime = document.getElementById('shipping-modal__time').value
  if ( shippingTime === '' ) {
    M.toast({html: strings[getState().language].errorShippingTime})
    return false
  }

  const newShipping = {
    description: shippingDescription,
    currency: JSON.parse(shippingCurrencyStr).currency,
    symbol: JSON.parse(shippingCurrencyStr).symbol,
    price: parseFloat(shippingPrice),
    days: shippingTime,
  }

  dispatch(startFetching())

  const dataStore = getState().store.data
  dataStore.shipping.push(newShipping)
  const newDataStore = dataStore
  apiUpdateDataStore(userId, storeId, newDataStore, (status, response) => {
    // update local dataStore store state, then...
    if (status!==httpStatusCodes.OK) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      console.log('Error')
      return false
    }
    dispatch({
      type: types.UPDATE_DATA_STORE,
      dataStore: newDataStore
    })
    /** close the modal */
    var elems = document.querySelectorAll('#shipping-modal')
    var instances = M.Modal.init(elems)
    instances[0].close()
    document.body.style.overflow = ''

    dispatch(stopFetching())
    M.toast({html: strings[getState().language].successUpdate})
  })

}

export const shippingDeleteButton = (shippingIndex) => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  //if (!logoInput.files[0]) {
  //  M.toast({html: Strings(getState().language).coverContainer.modal.errorCoverPicture})
  //  return false
  //}

  dispatch(startFetching())

  /** delete section's pictures */

  const dataStore = getState().store.data
  dataStore.shipping.splice(shippingIndex, 1)  // delete the section with index...
  const newDataStore = dataStore
  apiUpdateDataStore(userId, storeId, newDataStore, (status, response) => {
    // update local dataStore store state, then...
    if (status!==httpStatusCodes.OK) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      console.log('Error')
      return false
    }
    dispatch({
      type: types.UPDATE_DATA_STORE,
      dataStore: newDataStore
    })

    dispatch(stopFetching())
    M.toast({html: strings[getState().language].successUpdate})
  })

}
