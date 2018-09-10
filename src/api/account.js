/**
 * @module api/account
 * @author Grover Lee
 */

import { post } from './post.js'

 import {
   getSalesListByUserId,
   getSaleAsUser
 } from '../models/firebase/firebaseFirestore'

export const updateAccount = (payload, callback) => {
  post( "user/update/data", payload, callback )
}

export const updatePassword = (payload, callback) => {
  post( "user/update/password", payload, callback )
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
