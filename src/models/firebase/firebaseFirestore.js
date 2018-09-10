/**
 * @module firebase/firestore
 * @description Firestore interface
 */

var firebase = require('./firebaseInit.js')()
import { getEnv } from '../../config'

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

/*export const getStoreByUserId = (userId, callback) => {
  let result = null
  db.collection( getEnv().COLLECTION_STORES ).where('userId','==',userId)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data())
      result = {
        name:doc.data().name,
        username:doc.data().username,
        phone:doc.data().phone,
        profile:doc.data().profile,
        cover:doc.data().cover,
        userId:doc.data().userId
      }
    })
    callback(result)
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error)
    callback(false)
  })
  //shStoreSession.setStoreSession({username:this.props.match.params.storeusername, type:'store'})
}*/
