import fetch from 'cross-fetch'
import { getEnv } from '../config'

export const post = ( api, payload, callback ) => {
  fetch(getEnv().API_ENDPOINT_V1 + api,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
        //credentials: "same-origin"
      })
      .then(response => {
        return ({ status: response.status , body: response.json() })
      })
      .then(json => callback(json.status, json.body))
      .catch(err => {
        console.error(err)
      })
}

export const put = ( api, payload, callback ) => {
  fetch(getEnv().API_ENDPOINT_V1 + api,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
        //credentials: "same-origin"
      })
      .then(response => {
        return ({ status: response.status , body: response.json() })
      })
      .then(json => callback(json.status, json.body))
      .catch(err => {
        console.error(err)
      })
}
