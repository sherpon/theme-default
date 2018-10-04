import fetch from 'cross-fetch'
import { getEnv } from '../config'

export const post = ( api, payload, callback ) => {
  let status
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
        status = response.status
        return (response.json())
      })
      .then(json => {
        callback(status, json)
      })
      .catch(err => {
        console.error(err)
      })
}

export const put = ( api, payload, callback ) => {
  let status
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
        status = response.status
        return (response.json())
      })
      .then(json => {
        callback(status, json)
      })
      .catch(err => {
        console.error(err)
      })
}
