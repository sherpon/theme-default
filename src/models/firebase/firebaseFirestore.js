var firebase = require('./firebaseInit.js')()
import { getEnv } from '../../config'

const db = firebase.firestore()

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
