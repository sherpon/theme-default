/**
 * @module api/item
 * @author Grover Lee
 */

import {
  getProductsListByCategory,
  getProductsListBySearch,
  getProductById
} from '../models/firebase/firebaseFirestore'
import { noLinkUnderscore } from '../models/tools'

const TIMEOUT = 500

export const getItemsByCategory = (storeId, category, callback) => {
  getProductsListByCategory(storeId, category, callback)
}
export const getItemsBySearch = (storeId, search, callback) => {
  let newSearch = noLinkUnderscore(search)
  newSearch = newSearch.split(' ')
  let words = [ newSearch[0], newSearch[0], newSearch[0] ]
  const wordsLength = newSearch.length
  let forCount = 0
  if ( wordsLength > 3 ) {
    forCount = 3
  } else {
    forCount = wordsLength
  }
  for (let i = 0 ; i < forCount ; i++ ) {
    words[i] = newSearch[i]
  }
  getProductsListBySearch(storeId, words[0], words[1], words[2], callback)
}
export const getItemById = (storeId, itemId, callback) => {
  getProductById(storeId, itemId, callback)
  /*if (itemId==='Hu3fU02Bdhgpo476Fej1') {
    setTimeout( () => { callback(_itemById1) },TIMEOUT )
  } else if (itemId==='Hu3fU02Bdhgpo476Fej2') {
    setTimeout( () => { callback(_itemById2) },TIMEOUT )
  } else if (itemId==='Hu3fU02Bdhgpo476Fej3') {
    setTimeout( () => { callback(_itemById3) },TIMEOUT )
  } else {
    setTimeout( () => { callback(_itemById4) },TIMEOUT )
  }*/
}

/*


 */
