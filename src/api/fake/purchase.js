const TIMEOUT = 500

export const createPurchase = (payload, callback) => {
  console.log('API.signup.payload')
  console.log(payload)

  setTimeout( () => {
    callback(true)
  },TIMEOUT )
}
