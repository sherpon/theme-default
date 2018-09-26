/**
 * @module api/sale
 * @author Grover Lee
 */

import { post } from './post.js'

export const createPurchase = (payload, callback) => {
  post( "sale/create", payload, callback )
}
