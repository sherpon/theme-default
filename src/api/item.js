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
}

/*


 */
