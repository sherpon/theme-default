import { getEnv } from '../../config'

module.exports = function ( ) {

  if (!firebase.apps.length) {
    firebase.initializeApp( getEnv().FIREBASE_APP )
  }

  //firebase.initializeApp(config);
  return firebase;
  
}