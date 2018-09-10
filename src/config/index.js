const STATE_PRODUCTION = "PRODUCTION"
const STATE_STAGE = "STAGE"
const STATE_DEVELOPMENT = "DEVELOPMENT"

const ENV_PROD = {
  "ENDPOINT":"https://sherpon.com/",
  "API_ENDPOINT_V1":"/api/v1/",
  "MONGODB_URI":"",
  "SERVICE_ACCOUNT_JSON":"",
  "FIREBASE_DATABASE_URL":"",
  "GOOGLE_SERVICE_ACCOUNT":"./ServicesAccount.json",
  "COLLECTION_USERS":"users",
  "COLLECTION_STORES":"stores",
  "COLLECTION_PRODUCTS":"products",
  "COLLECTION_SALES":"sales",
  "ANALYTICS_TRACK_ID":"UA-54697040-5",
  "FACEBOOK_PIXEL_ID":"195304191192601",
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

const ENV_STAGE = {
  "ENDPOINT":"https://staging.sherpon.com/",
  "API_ENDPOINT_V1":"/api/v1/",
  "MONGODB_URI":"",
  "SERVICE_ACCOUNT_JSON":"",
  "FIREBASE_DATABASE_URL":"",
  "GOOGLE_SERVICE_ACCOUNT":"./ServicesAccount.json",
  "COLLECTION_USERS":"stage_users",
  "COLLECTION_STORES":"stage_stores",
  "COLLECTION_PRODUCTS":"stage_products",
  "COLLECTION_SALES":"stage_sales",
  "ANALYTICS_TRACK_ID":"UA-54697040-5",
  "FACEBOOK_PIXEL_ID":"195304191192601",
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

const ENV_DEV = {
  "ENDPOINT":"http://sherpon.localhost:3000/",
  "API_ENDPOINT_V1":"/api/v1/",
  "MONGODB_URI":"",
  "SERVICE_ACCOUNT_JSON":"",
  "FIREBASE_DATABASE_URL":"",
  "GOOGLE_SERVICE_ACCOUNT":"./ServicesAccount.json",
  "COLLECTION_USERS":"dev_users",
  "COLLECTION_STORES":"dev_stores",
  "COLLECTION_PRODUCTS":"dev_products",
  "COLLECTION_SALES":"dev_sales",
  "ANALYTICS_TRACK_ID":"UA-54697040-5",
  "FACEBOOK_PIXEL_ID":"195304191192601",
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
  if (  location.hostname === "localhost" ||
        location.hostname === "sherpon.localhost" ||
        location.hostname === "backoffice.sherpon.localhost" ||
        location.hostname === "supplier.sherpon.localhost" ||
        location.hostname === "0.0.0.0"
  ) {
    // DEV
    window.mSTATE = STATE_DEVELOPMENT
    return STATE_DEVELOPMENT
  } else if ( location.hostname === 'staging.sherpon.com' ) {
    // STAGING
    window.mSTATE = STATE_STAGE
    return STATE_STAGE
  } else {
    window.mSTATE = STATE_PRODUCTION
    return STATE_PRODUCTION
  }
}

export const getEnv = () => {
  if ( getState () === STATE_DEVELOPMENT ) {  //DEV
    return ENV_DEV
  } else if ( getState () === STATE_STAGE ) {  // STAGING
    return ENV_STAGE
  } else {  // PRODUCTION
    return ENV_PROD
  }
}
