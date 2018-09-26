import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom' // import { BrowserRouter as Router } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import history from './models/history'

import reducer from './reducers'

import StoreContainer from './containers/storeContainer.jsx' /***/

/**
 * here is the prod difference
 */
 let store
 const middleware = [ thunk ]
 if (process.env.NODE_ENV !== 'production') {
   middleware.push(createLogger())
   store = createStore(
     reducer,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // for chrome extension
     applyMiddleware(...middleware)
   )
 } else {
   store = createStore(
     reducer,
     applyMiddleware(...middleware)
   )
 }
/**
 * ends
 */

 const App = () => {
   return (
     <Provider store={store}>
       <Router history={history}>
         <StoreContainer/>
       </Router>
     </Provider>
   )
 }

 export default App

render(
  <App/>,
  document.getElementById('app')
)
