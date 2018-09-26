/**
 * @module firebase/firestore
 * @description Firestore interface
 */

//var firebase = require('./firebaseInit.js')()
import firebaseInit from './firebaseInit.js'
import { getEnv } from '../../config'

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
        picture1:doc.data().picture1,
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
 * @function getProductsListByCategory
 * @description Get the store's products list by category
 */
 export const getProductsListByCategory = (storeId, category, callback) => {
   let result = {
     error:null,
     products:[]
   }
   /** DO-TO check if is admin */
   db.collection( getEnv().COLLECTION_STORES )
     .doc(storeId)
     .collection( getEnv().COLLECTION_PRODUCTS )
     .where(`tags.${category}`,'==',true)
     .get()
   .then(function(querySnapshot) {
     let itemsList = []
     querySnapshot.forEach(function(doc) {
       const item = {
         id:doc.id,
         stock:doc.data().stock,
         picture1:doc.data().picture1,
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
 * @function getProductsListBySearch
 * @description Get the store's products list by search
 */
 export const getProductsListBySearch = (storeId, word1, word2, word3, callback) => {
   let result = {
     error:null,
     products:[]
   }
   /** DO-TO check if is admin */
   let itemsList = []

   const searchWord1 = () => {
     db.collection( getEnv().COLLECTION_STORES )
       .doc(storeId)
       .collection( getEnv().COLLECTION_PRODUCTS )
       .where(`tags.${word1}`,'==',true)
       .get()
     .then(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
         const item = {
           id:doc.id,
           stock:doc.data().stock,
           picture1:doc.data().picture1,
           shortTitle:doc.data().shortTitle,
           currency:doc.data().currency,
           symbol:doc.data().symbol,
           price:doc.data().price
         }
         itemsList.push(item)
       })
       searchWord2()
     })
     .catch(function(error) {
       console.log("Error getting documents: ", error)
       callback(result)
     })
   }

   const searchWord2 = () => {
     db.collection( getEnv().COLLECTION_STORES )
       .doc(storeId)
       .collection( getEnv().COLLECTION_PRODUCTS )
       .where(`tags.${word2}`,'==',true)
       .get()
     .then(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
         const item = {
           id:doc.id,
           stock:doc.data().stock,
           picture1:doc.data().picture1,
           shortTitle:doc.data().shortTitle,
           currency:doc.data().currency,
           symbol:doc.data().symbol,
           price:doc.data().price
         }
         itemsList.push(item)
       })
       searchWord3()
     })
     .catch(function(error) {
       console.log("Error getting documents: ", error)
       callback(result)
     })
   }

   const searchWord3 = () => {
     db.collection( getEnv().COLLECTION_STORES )
       .doc(storeId)
       .collection( getEnv().COLLECTION_PRODUCTS )
       .where(`tags.${word3}`,'==',true)
       .get()
     .then(function(querySnapshot) {
       querySnapshot.forEach(function(doc) {
         const item = {
           id:doc.id,
           stock:doc.data().stock,
           picture1:doc.data().picture1,
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

   /** here start */
   searchWord1()
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
 * @function getSaleById
 * @description Get the store's sale by id
 */
 export const getSaleById = ( userId, storeId, saleId, callback ) => {
   let result = {
     error:null,
     sale:null
   }
   /** DO-TO check if is admin */
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
