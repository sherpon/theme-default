/**
 * @module api/store
 * @author Grover Lee
 */

 import _getProducts from './data/getProducts.json'
 import _getSales from './data/getSales.json'
 import _getSale from './data/getSale.json'

const TIMEOUT = 500

export const updateDataTheme = (userId, storeId, newDataTheme, callback) => {
  console.log('API.updateDataTheme.payload')
  const payload = { userId, storeId, newDataTheme }
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null
    })
  },TIMEOUT )
}

export const updateDataStore = (userId, storeId, newDataStore, callback) => {
  console.log('API.updateDataStore.payload')
  const payload = { userId, storeId, newDataStore }
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null
    })
  },TIMEOUT )
}

export const updateCategoriesStore = (userId, storeId, newCategory, callback) => {
  console.log('API.updateCategoriesStore.payload')
  const payload = { userId, storeId, newCategory }
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null
    })
  },TIMEOUT )
}

/**
 * Upload the store's image
 * @param {File} file - store's id.
 * @param {string} fileName - image's name.
 * @param {string} storeId - store's id.
 * @param {uploadImageStore~callback} callback - The callback that handles the response.
 */
export const uploadImageStore = (file, fileName, storeId, callback) => {
  /**
  temporalmente se va a mandar la misma url del archivo, luego se implementara firestore
  */
  setTimeout( () => {
    //let fr = new FileReader()
    //fr.readAsDataURL(file)
    //console.log('uploadImageStore.callback')
    //console.log(fr.result)
    callback(fileName)
  },TIMEOUT )
}
/**
 * @callback uploadImageStore~callback
 * @param {string} downloadURL - picture's download url
 */

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
  console.log('API.getProducts.payload')
  const payload = { userId, storeId }
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null,
      products: _getProducts
    })
  },TIMEOUT )
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
  console.log('API.getSales.payload')
  const payload = { userId, storeId }
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null,
      sales: _getSales
    })
  },TIMEOUT )
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
  console.log('API.getSale.payload')
  const payload = { userId, storeId, saleId }
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null,
      sale: _getSale
    })
  },TIMEOUT )
}
/**
 * @callback getSale~callback
 * @param {Object} result - result's object
 * @property {?number} result.error - show any error in the response or show null value
 * @property {Object} result.sale - show the sale's object
 */
/******************************************************************************/
