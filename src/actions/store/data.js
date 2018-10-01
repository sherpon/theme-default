import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import httpStatusCodes from '../../constants/httpStatusCodes.json'

import {
  updateDataStore as apiUpdateDataStore
} from '../../api/store'

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
