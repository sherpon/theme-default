import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

/** containers */
import HomePage from '../pages/homePage.jsx'
import CategoriesPage from '../pages/categoriesPage.jsx'
import CategoryPage from '../pages/categoryPage.jsx'
import ProductsPage from '../pages/productsPage.jsx'
import SalesPage from '../pages/salesPage.jsx'
import PaymentGatewayPage from '../pages/paymentGatewayPage.jsx'
import MarketingPage from '../pages/marketingPage.jsx'
import AccountPage from '../pages/accountPage.js'

const Viewport = ({}) => {
  return (
    <main className="container">
      <Switch>
        <Route exact path="/:storeusername/category/:parent/:category" component={ CategoryPage } />
        <Route exact path="/:storeusername/category/:category" component={ CategoryPage } />
        <Route exact path="/:storeusername/categories" component={ CategoriesPage } />
        <Route exact path="/:storeusername/products" component={ ProductsPage } />
        <Route exact path="/:storeusername/sales" component={ SalesPage } />
        <Route exact path="/:storeusername/paymentgateway" component={ PaymentGatewayPage } />
        <Route exact path="/:storeusername/marketing" component={ MarketingPage } />
        <Route exact path="/:storeusername/account" component={ AccountPage } />
        <Route exact path="/:storeusername" component={HomePage} />
        <Route component={HomePage}/>
      </Switch>
    </main>
  )
}

export default Viewport
