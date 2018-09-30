import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

/** containers */
import HomePage from '../pages/homePage.jsx'
import CategoriesPage from '../pages/categoriesPage.jsx'
import CategoryPage from '../pages/categoryPage.jsx'
CategoryPage

const Viewport = ({}) => {
  return (
    <main className="container">
      <Switch>
        <Route exact path="/:storeusername/category/:parent/:category" component={ CategoryPage } />
        <Route exact path="/:storeusername/category/:category" component={ CategoryPage } />
        <Route exact path="/:storeusername/categories" component={ CategoriesPage } />
        <Route exact path="/:storeusername" component={HomePage} />
        <Route component={HomePage}/>
      </Switch>
    </main>
  )
}

export default Viewport
