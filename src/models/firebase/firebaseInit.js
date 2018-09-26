import { getEnv } from '../../config'

const firebaseInit = () => {

  if (!firebase.apps.length) {
    firebase.initializeApp( getEnv().FIREBASE_APP )
  }

  //firebase.initializeApp(config);
  return firebase;
}

export default firebaseInit
