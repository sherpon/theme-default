import fetch from 'cross-fetch'
import { getEnv } from '../config'

export const post = ( api, payload, callback ) => {
  fetch(
    getEnv().API_ENDPOINT_V1 + api,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }
  )
  .then(response => response.json())
  .then(json => callback(json))
}

/**
fetch('//api.github.com/users/lquixada')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log(user);
  })
  .catch(err => {
    console.error(err);
  })
*/
