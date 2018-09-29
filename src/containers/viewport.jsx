import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

/** containers */
import HomePage from '../pages/homePage.jsx'
import CategoriesPage from '../pages/categoriesPage.jsx'

const Viewport = ({}) => {
  return (
    <main className="container">
      <Switch>
        <Route exact path="/:storeusername/categories" component={ CategoriesPage } />
        <Route exact path="/:storeusername" component={HomePage} />
        <Route component={HomePage}/>
      </Switch>
    </main>
  )
}

export default Viewport
