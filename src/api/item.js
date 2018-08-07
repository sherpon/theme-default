import _itemsByCategory from './data/_itemsByCategory.json'
// const _itemsByCategory = []
import _itemsBySearch from './data/_itemsBySearch.json'
// const _itemsBySearch = []
import _itemById1 from './data/_itemById1.json'
//const _itemById1 = {}
import _itemById2 from './data/_itemById2.json'
//const _itemById2 = {}
import _itemById3 from './data/_itemById3.json'
//const _itemById3 = {}
import _itemById4 from './data/_itemById4.json'
//const _itemById4 = {}

const TIMEOUT = 500

export const getItemsByCategory = (storeId, category, callback) => {
  setTimeout( () => { callback(_itemsByCategory) },TIMEOUT )
}
export const getItemsBySearch = (storeId, search, callback) => {
  setTimeout( () => { callback(_itemsBySearch) },TIMEOUT )
}
export const getItemById = (storeId, itemId, callback) => {
  if (itemId==='Hu3fU02Bdhgpo476Fej1') {
    setTimeout( () => { callback(_itemById1) },TIMEOUT )
  } else if (itemId==='Hu3fU02Bdhgpo476Fej2') {
    setTimeout( () => { callback(_itemById2) },TIMEOUT )
  } else if (itemId==='Hu3fU02Bdhgpo476Fej3') {
    setTimeout( () => { callback(_itemById3) },TIMEOUT )
  } else {
    setTimeout( () => { callback(_itemById4) },TIMEOUT )
  }
}

/*


 */