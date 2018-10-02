import {
  getProductsList,
  getProductById
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

/******************************************************************************/
/**
 * @function
 * @name createNewProduct
 * @description create the store's new product
 * // where's this function used?
 * // - src/actions/store.js
 * // module:actions/store~
 * @param {string} userId - user's id.
 * @param {string} storeId - store's id.
 * @param {Object} newProduct - store's new product.
 * @property {string} newProduct.type - type of product. Options: item, models, clothes.
 * @property {string} newProduct.shortTitle - short Title of product. Shouldn't be more than 30 words.
 * @property {string} newProduct.longTitle - long Title of product.
 * @property {string[]} newProduct.tags - tags of product. Could be words from title and category
 * @property {Object[]} newProduct.categories - categories of product.
 * @property {string} newProduct.description - description of product.
 * @property {string} newProduct.include - include description of product.
 * @property {string} newProduct.characteristics - description of product.
 * @property {string} newProduct.currency - currency of product. Should be in int code. E.g. USD, PEN, EUR.
 * @property {string} newProduct.symbol - symbol of product. E.g. $.
 * @property {number} newProduct.price - price of product. E.g. 10.
 * @property {number} newProduct.stock - stock of product. E.g. 20.
 * @property {Object[]} newProduct.shipping - shipping methods of product.
 * @property {Object[]} newProduct.attributes - attributes of product.
 * @property {Object[]} newProduct.variations - variations of product.
 * @property {string[]} newProduct.pictures - pictures of product.
 * @param {createNewProduct~callback} callback - The callback that handles the response.
 */
export const createNewProduct = ( userId, storeId, newProduct, callback ) => {
  post( 'products?userid='+userId+'&storeid='+storeId, { newProduct }, callback )
}
/**
 * @callback createNewProduct~callback
 * @param {Object} result - products list array
 * @property {?number} result.error - show any error in the response or show null value
 */
/******************************************************************************/

/******************************************************************************/
export const getItemById = (storeId, itemId, callback) => {
  getProductById(storeId, itemId, callback)
}
/******************************************************************************/
