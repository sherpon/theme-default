
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
