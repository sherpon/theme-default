//import { uploadPicture } from '../models/firebase/firebaseStorage'

import { post, put } from './httpRequest.js'

/**export const createCategoriesStore = (userId, storeId, newDataTheme, callback) => {
  put( "stores/"+storeId+"/theme/data?id="+userId, { newDataTheme }, callback )
}*/

export const createCategoriesStore = (userId, storeId, newCategory, callback) => {
  post( "categories?userid="+userId+"&storeid="+storeId, { newCategory }, callback )
}
