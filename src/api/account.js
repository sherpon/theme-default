import _purchasesList from './data/purchasesList.json'

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
