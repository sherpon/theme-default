import firebaseInit from '../firebaseInit.js'
import { getEnv } from '../../../config'

const firebase = firebaseInit()
const db = firebase.firestore()

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
