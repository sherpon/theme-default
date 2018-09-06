import _purchasesList from './data/purchasesList.json'
import _purchaseItem from './data/purchaseItem.json'

const TIMEOUT = 500

export const updateAccount = (payload, callback) => {
  console.log('API.apiUpdateAccount.payload')
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null
    })
  },TIMEOUT )
}

export const updatePassword = (payload, callback) => {
  console.log('API.apiUpdatePassword.payload')
  console.log(payload)

  setTimeout( () => {
    callback({
      error: null
    })
  },TIMEOUT )
}

export const loadPurchasesList = (payload, callback) => {
  console.log('API.loadPurchasesList.payload')
  console.log(payload)

  setTimeout( () => {
    callback(_purchasesList)
  },TIMEOUT )
}

/**
 * Returns the user's purchase json
 * @param {string} storeId - store's id.
 * @param {string} purchaseId - purchase's id.
 * @param {loadPurchase~callback} callback - The callback that handles the response.
 */
export const loadPurchase = (storeId, purchaseId, callback) => {
  console.log('API.loadPurchase.payload')
  console.log({storeId, purchaseId})

  setTimeout( () => {
    callback(_purchaseItem)
  },TIMEOUT )
}
/**
 * @callback loadPurchase~callback
 * @param {object} purchase - purchase's object
 */
