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
