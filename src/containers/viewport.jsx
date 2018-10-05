import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

/** components */
import CongratulationPurchase from '../components/checkout/congratulationPurchase/congratulationPurchase.jsx'

/** containers */
import HomePage from '../pages/homePage.jsx'
import CategoriesPage from '../pages/categoriesPage.jsx'
import CategoryPage from '../pages/categoryPage.jsx'
import ProductsPage from '../pages/productsPage.jsx'
import ProductPage from '../pages/productPage.jsx'
import ItemPage from '../pages/itemPage.jsx'
import SalesPage from '../pages/salesPage.jsx'
import PaymentGatewayPage from '../pages/paymentGatewayPage.jsx'
import MarketingPage from '../pages/marketingPage.jsx'
import AccountPage from '../pages/accountPage.jsx'
import PurchasesPage from '../pages/purchasesPage.jsx'
import CartPage from '../pages/cartPage.jsx'
import CheckoutPage from '../pages/checkoutPage.jsx'
import SalePage from '../pages/salePage.jsx'
import PurchasePage from '../pages/purchasePage.jsx'
import LoginPage from '../pages/loginPage.jsx'


const Viewport = ({}) => {
  return (
    <main className="container">
      <Switch>
        <Route exact path="/:storeusername/item/:title/:id" component={ ItemPage } />
        <Route exact path="/:storeusername/product/:title/:id" component={ ItemPage } />
        <Route exact path="/:storeusername/category/:parent/:category" component={ CategoryPage } />
        <Route exact path="/:storeusername/category/:category" component={ CategoryPage } />
        <Route exact path="/:storeusername/sale/:id" component={ SalePage } />
        <Route exact path="/:storeusername/purchase/:id" component={ PurchasePage } />
        <Route exact path="/:storeusername/categories" component={ CategoriesPage } />
        <Route exact path="/:storeusername/products" component={ ProductsPage } />
        <Route exact path="/:storeusername/product/new" component={ ProductPage } />
        <Route exact path="/:storeusername/sales" component={ SalesPage } />
        <Route exact path="/:storeusername/paymentgateway" component={ PaymentGatewayPage } />
        <Route exact path="/:storeusername/marketing" component={ MarketingPage } />
        <Route exact path="/:storeusername/account" component={ AccountPage } />
        <Route exact path="/:storeusername/purchases" component={ PurchasesPage } />
        <Route exact path="/:storeusername/cart" component={ CartPage } />
        <Route exact path="/:storeusername/checkout" component={ CheckoutPage } />
        <Route exact path="/:storeusername/congratulation/purchase" component={ CongratulationPurchase } />
          <Route exact path="/:storeusername/login/checkout" component={ () => <LoginPage guest={false} mode={"login"} /> } />
          <Route exact path="/:storeusername/login" component={ () => <LoginPage guest={false} mode={"login"} /> } />
          <Route exact path="/:storeusername/signup" component={ () => <LoginPage guest={false} mode={"signup"} /> } />
        <Route exact path="/:storeusername" component={HomePage} />
        <Route component={HomePage}/>
      </Switch>
    </main>
  )
}

export default Viewport
