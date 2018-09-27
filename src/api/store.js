import { uploadPicture } from '../models/firebase/firebaseStorage'

import { put } from './httpRequest.js'

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

export const updateDataTheme = (userId, storeId, newDataTheme, callback) => {
  put( "stores/"+storeId+"/theme/data?id="+userId, { newDataTheme }, callback )
}
