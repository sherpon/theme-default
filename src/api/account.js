/**
 * @module api/account
 * @author Grover Lee
 */

 import {
   getSalesListByUserId,
   getSaleAsUser
 } from '../models/firebase/firebaseFirestore'

export const updateAccount = (payload, callback) => {
  console.log('API.apiUpdateAccount.payload')
  console.log(payload)

  callback({
    error: null
  })
}

export const updatePassword = (payload, callback) => {
  console.log('API.apiUpdatePassword.payload')
  console.log(payload)

  callback({
    error: null
  })
}

export const loadPurchasesList = (storeId, userId, callback) => {
  getSalesListByUserId(storeId, userId, callback)
}

/**
 * Returns the user's purchase json
 * @param {string} storeId - store's id.
 * @param {string} purchaseId - purchase's id.
 * @param {loadPurchase~callback} callback - The callback that handles the response.
 */
export const loadPurchase = (storeId, purchaseId, callback) => {
  getSaleAsUser( storeId, purchaseId, callback )
}
/**
 * @callback loadPurchase~callback
 * @param {object} purchase - purchase's object
 */
