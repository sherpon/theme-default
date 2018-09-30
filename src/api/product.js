import {
  getProductsList
} from '../models/firebase/firestore/product'

import { post, put } from './httpRequest.js'

/******************************************************************************/
/**
 * @function
 * @name getProducts
 * @description get the store's products list
 * // where's this function used?
 * // - src/actions/store.js
 * // module:actions/store~loadProductsList as apiGetProducts
 * @param {string} userId - user's id.
 * @param {string} storeId - store's id.
 * @param {getProducts~callback} callback - The callback that handles the response.
 */
export const getProducts = (userId, storeId, callback) => {
  //post( "product/list", { userId, storeId }, callback )
  getProductsList(storeId, callback)
}
/**
 * @callback getProducts~callback
 * @param {Object} result - products list array
 * @property {?number} result.error - show any error in the response or show null value
 * @property {Product[]} result.products - show the array of products
 */
/******************************************************************************/
