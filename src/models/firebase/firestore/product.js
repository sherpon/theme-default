import firebaseInit from '../firebaseInit.js'
import { getEnv } from '../../../config'

const firebase = firebaseInit()
const db = firebase.firestore()

/******************************************************************************/
/**
 * @function getProductsList
 * @description Get the store's products list as admin
 */
export const getProductsList = (storeId, callback) => {
  let result = {
    error:null,
    products:[]
  }
  /** DO-TO check if is admin */
  db.collection( getEnv().COLLECTION_STORES )
    .doc(storeId)
    .collection( getEnv().COLLECTION_PRODUCTS )
    .get()
  .then(function(querySnapshot) {
    let itemsList = []
    querySnapshot.forEach(function(doc) {
      const item = {
        id:doc.id,
        stock:doc.data().stock,
        picture1:doc.data().pictures[0],
        shortTitle:doc.data().shortTitle,
        currency:doc.data().currency,
        symbol:doc.data().symbol,
        price:doc.data().price
      }
      itemsList.push(item)
    })
    result.products = itemsList

    callback(result)
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error)
    callback(result)
  })
}
/******************************************************************************/

/******************************************************************************/
/**
 * @function getProductById
 * @description Get the store's product by id
 */
 export const getProductById = (storeId, itemId, callback) => {
   let result = {
     error:null,
     product:null
   }
   /** DO-TO check if is admin */
   db.collection( getEnv().COLLECTION_STORES )
     .doc(storeId)
     .collection( getEnv().COLLECTION_PRODUCTS )
     .doc(itemId)
     .get()
   .then(function(doc) {
      if (doc.exists) {
        const mProduct = { id:doc.id, ...doc.data() }
        result.product = mProduct
        callback(result)
      } else {
        callback(result)
      }
    }).catch(function(error) {
      console.log("Error getting documents: ", error)
      callback(result)
    })
 }
/******************************************************************************/
