import { put } from './httpRequest.js'

export const updateDataTheme = (userId, storeId, newDataTheme, callback) => {
  put( "stores/"+storeId+"/theme/data?id="+userId, { newDataTheme }, callback )
}
