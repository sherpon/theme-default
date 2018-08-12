const TIMEOUT = 500

export const createPurchase = (payload, callback) => {
  setTimeout( () => { 
    callback(true)
  },TIMEOUT )
}