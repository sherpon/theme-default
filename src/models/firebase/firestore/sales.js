import firebaseInit from '../firebaseInit.js'
import { getEnv } from '../../../config'

const firebase = firebaseInit()
const db = firebase.firestore()

/******************************************************************************/
/**
 * @function getSalesList
 * @description Get the store's sales list as admin
 */
export const getSalesList = ( userId, storeId, callback ) => {
  let result = {
    error:null,
    sales:[]
  }
  /** DO-TO check if is admin */
  db.collection( getEnv().COLLECTION_STORES )
    .doc(storeId)
    .collection( getEnv().COLLECTION_SALES )
    .get()
  .then(function(querySnapshot) {
    let salesList = []
    querySnapshot.forEach(function(doc) {
      const sale = {
        id:doc.id,
        timestamp:doc.data().timestamp,
        state:doc.data().state,
        currency:doc.data().cart.total.currency,
        symbol:doc.data().cart.total.symbol,
        amount:doc.data().cart.total.price
      }
      salesList.push(sale)
    })
    result.sales = salesList

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
 * @function getSalesListByUserId
 * @description Get the store's sales list by user's id
 */
export const getSalesListByUserId = (storeId, userId, callback) => {
  let result = {
    error:null,
    sales:[]
  }
  /** DO-TO check if is admin */
  db.collection( getEnv().COLLECTION_STORES )
   .doc(storeId)
   .collection( getEnv().COLLECTION_SALES )
   .where('user.id','==',userId)
   .get()
  .then(function(querySnapshot) {
   let salesList = []
   querySnapshot.forEach(function(doc) {
     const sale = {
       id:doc.id,
       timestamp:doc.data().timestamp,
       state:doc.data().state,
       currency:doc.data().cart.total.currency,
       symbol:doc.data().cart.total.symbol,
       amount:doc.data().cart.total.price
     }
     salesList.push(sale)
   })
   result.sales = salesList

   callback(result)
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error)
    result.error = error
    callback(result)
  })
}
/******************************************************************************/

/******************************************************************************/
/**
 * @function getSaleAsUser
 * @description Get the store's sale as user
 */
 export const getSaleAsUser = ( storeId, saleId, callback ) => {
   let result = {
     error:null,
     sale:null
   }

   db.collection( getEnv().COLLECTION_STORES )
     .doc(storeId)
     .collection( getEnv().COLLECTION_SALES )
     .doc(saleId)
     .get()
   .then(function(doc) {
      if (doc.exists) {
        const mSale = { id:doc.id, ...doc.data() }
        result.sale = mSale
        callback(result)
      } else {
        callback(result)
      }
    }).catch(function(error) {
      console.log("Error getting documents: ", error)
      result.error = error
      callback(result)
    })
 }
/******************************************************************************/
