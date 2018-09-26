/**
 * @module api/store
 * @author Grover Lee
 */

import { post } from './httpRequest.js'
import { uploadPicture } from '../models/firebase/firebaseStorage'
import {
  getProductsList,
  getSalesList,
  getSaleById
} from '../models/firebase/firebaseFirestore'

export const updateDataTheme = (userId, storeId, newDataTheme, callback) => {
  post( "store/theme/data/update", { userId, storeId, newDataTheme }, callback )
}

export const updateDataStore = (userId, storeId, newDataStore, callback) => {
  post( "store/data/update", { userId, storeId, newDataStore }, callback )
}

export const updateCategoriesStore = (userId, storeId, newCategory, callback) => {
  post( "store/categories/update", { userId, storeId, newCategory }, callback )
}

/******************************************************************************/
/**
 * Upload the store's image
 * @param {File} file - store's id.
 * @param {string} fileName - image's name.
 * @param {string} storeId - store's id.
 * @param {uploadImageStore~callback} callback - The callback that handles the response.
 */
export const uploadImageStore = (file, fileName, storeId, callback) => {
  uploadPicture(file, fileName, storeId, callback)
}
/**
 * @callback uploadImageStore~callback
 * @param {string} downloadURL - picture's download url
 */
/******************************************************************************/

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
 * @property {string} newProduct.picture1 - picture1 of product.
 * @property {string} newProduct.picture2 - picture2 of product.
 * @property {string} newProduct.picture3 - picture3 of product.
 * @property {string} newProduct.picture4 - picture4 of product.
 * @property {string} newProduct.picture5 - picture5 of product.
 * @property {string} newProduct.picture6 - picture6 of product.
 * @property {string} newProduct.picture7 - picture7 of product.
 * @param {createNewProduct~callback} callback - The callback that handles the response.
 */
export const createNewProduct = ( userId, storeId, newProduct, callback ) => {
  post( "product/create", { userId, storeId, newProduct }, callback )
}
/**
 * @callback createNewProduct~callback
 * @param {Object} result - products list array
 * @property {?number} result.error - show any error in the response or show null value
 */
/******************************************************************************/

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
