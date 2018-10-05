import {
  getSalesList,
  getSalesListByUserId,
  getSaleAsUser,
  getSaleById
} from '../models/firebase/firestore/sales'

import { post } from './httpRequest.js'

export const createPurchase = (storeId, payload, callback) => {
  post( 'sales?storeid='+storeId, payload, callback )
}

/******************************************************************************/
/**
 * @function
 * @name getSales
 * @description get the store's sales list
 * // where's this function used?
 * // - src/actions/store.js
 * // module:actions/store~loadSalesList as apiGetSales
 * @param {string} userId - user's id.
 * @param {string} storeId - store's id.
 * @param {getSales~callback} callback - The callback that handles the response.
 */
export const getSales = (userId, storeId, callback) => {
  //post( "sale/list", { userId, storeId }, callback )
  getSalesList( userId, storeId, callback )
}
/**
 * @callback getSales~callback
 * @param {Object} result - sales list array
 * @property {?number} result.error - show any error in the response or show null value
 * @property {Sales[]} result.sales - show the array of sales
 */
/******************************************************************************/

/******************************************************************************/
export const loadPurchasesList = (storeId, userId, callback) => {
  getSalesListByUserId(storeId, userId, callback)
}
/******************************************************************************/

/******************************************************************************/
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

 /******************************************************************************/
 /**
  * @function
  * @name getSale
  * @description get the store's sale by id
  * // where's this function used?
  * // - src/actions/store.js
  * // module:actions/store~
  * @param {string} userId - user's id.
  * @param {string} storeId - store's id.
  * @param {string} saleId - sale's id.
  * @param {getSale~callback} callback - The callback that handles the response.
  */
 export const getSale = (userId, storeId, saleId, callback) => {
   //post( "sale/get", { userId, storeId, saleId }, callback )
   getSaleById( userId, storeId, saleId, callback )
 }
 /**
  * @callback getSale~callback
  * @param {Object} result - result's object
  * @property {?number} result.error - show any error in the response or show null value
  * @property {Object} result.sale - show the sale's object
  */
 /******************************************************************************/
