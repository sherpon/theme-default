const STATE_PRODUCTION = "PRODUCTION"
const STATE_DEVELOPMENT = "DEVELOPMENT"

const ENV_PROD = {
  "ENDPOINT":"https://sherpon.com/",
  "BACKEND_ENDPOINT":"https://sherpon.com/",
  "API_ENDPOINT_V1":"https://sherpon.com/api/v1/",
  "BACKOFFICE_BACKEND_ENDPOINT":"https://backoffice.sherpon.com/",
  "MONGODB_URI":"",
  "SERVICE_ACCOUNT_JSON":"",
  "FIREBASE_DATABASE_URL":"",
  "GOOGLE_SERVICE_ACCOUNT":"./ServicesAccount.json",
  "FIRESTORE_DATABASE_URL":"https://playground-demnio.firebaseio.com",
  "COLLECTION_USERS":"shUsers",
  "COLLECTION_STORES":"shStores",
  "COLLECTION_PROVIDER":"shProviders",
  "COLLECTION_ITEM":"shItems",
  "COLLECTION_PURCHASE":"shPurchases",
  "APP_ID_FACEBOOK":"123762241591576",
  "FIREBASE_APP":{
    apiKey: "AIzaSyAvS0Q6iuqo1xqzgBFl5ybVUCvu3Qkb1zY",
    authDomain: "sherponcom.firebaseapp.com",
    databaseURL: "https://sherponcom.firebaseio.com",
    projectId: "sherponcom",
    storageBucket: "sherponcom.appspot.com",
    messagingSenderId: "1072437189631"
  }
}

const ENV_DEV = {
  "ENDPOINT":"http://sherpon.localhost:3000/",
  "BACKEND_ENDPOINT":"http://sherpon.localhost:3000/",
  "API_ENDPOINT_V1":"http://sherpon.localhost:3000/api/v1/",
  "BACKOFFICE_BACKEND_ENDPOINT":"http://backoffice.sherpon.localhost:3000/",
  "MONGODB_URI":"",
  "SERVICE_ACCOUNT_JSON":"",
  "FIREBASE_DATABASE_URL":"",
  "GOOGLE_SERVICE_ACCOUNT":"./ServicesAccount.json",
  "FIRESTORE_DATABASE_URL":"https://playground-demnio.firebaseio.com",
  "COLLECTION_USERS":"dev_shUsers",
  "COLLECTION_STORES":"dev_shStores",
  "COLLECTION_PROVIDER":"dev_shProviders",
  "COLLECTION_ITEM":"dev_shItems",
  "COLLECTION_PURCHASE":"dev_shPurchases",
  "APP_ID_FACEBOOK":"1594595550592061",
  "FIREBASE_APP":{
    apiKey: "AIzaSyAvS0Q6iuqo1xqzgBFl5ybVUCvu3Qkb1zY",
    authDomain: "sherponcom.firebaseapp.com",
    databaseURL: "https://sherponcom.firebaseio.com",
    projectId: "sherponcom",
    storageBucket: "sherponcom.appspot.com",
    messagingSenderId: "1072437189631"
  }
}

export const getState = () => {
  //tool.log ( "config.getState ( )", "START.", null, false)
  if (  location.hostname === "localhost" || 
        location.hostname === "sherpon.localhost" || 
        location.hostname === "backoffice.sherpon.localhost" || 
        location.hostname === "supplier.sherpon.localhost" || 
        location.hostname === "0.0.0.0" 
  ) { //DEV
    //console.log("State: " + STATE_DEVELOPMENT)
    //tool.log ( "config.getState ( )", "STATE_DEVELOPMENT: ", STATE_DEVELOPMENT, false)
    window.mSTATE = STATE_DEVELOPMENT
    return STATE_DEVELOPMENT
  } else {
    //tool.log ( "config.getState ( )", "STATE_PRODUCTION: ", STATE_PRODUCTION, false)
    window.mSTATE = STATE_PRODUCTION
    return STATE_PRODUCTION
  }
}

export const getEnv = () => {
  if ( getState () === STATE_DEVELOPMENT ) {  //DEV
    return ENV_DEV
  } else {  // PRODUCTION
    return ENV_PROD
  }
}
