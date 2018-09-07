var firebase = require('./firebaseInit.js')()
import { getEnv } from '../../config'

const db = firebase.firestore()

export const getProductsList = (storeId, callback) => {
  let result = {
    error:null,
    products:[]
  }
  db.collection( getEnv().COLLECTION_STORES )
    .doc(storeId)
    .collection( getEnv().COLLECTION_ITEMS )
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

export const getStoreByUserId = (userId, callback) => {
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
}
