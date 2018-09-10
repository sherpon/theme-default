import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

window.$ = require('jquery') // Note 1

import history from './models/history'

import reducer from './reducers'

import Store from './containers/store.js'

/**
 * here is the prod difference
 */
const middleware = [ thunk ]
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
/**
 * ends
 */

render(
  <Provider store={store}>
    <Router history={history}>
      <Store/>
    </Router>
  </Provider>,
  document.getElementById('root')
)

/*

Notes
=====
1. window.$ = require('jquery')
    es la unica forma para que funcione los init de Materialize
    no funciona:
    -import * as $ from 'jquery'
    -window.$ = $
    incluso
    -import 'jquery'
 */
