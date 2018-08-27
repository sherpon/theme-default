import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadStore, search } from '../actions'
import { logout } from '../actions/login'
import { editStoreSwitch, contactSaveButton } from '../actions/store'
import Strings from '../strings'
import session from '../models/session'

import Spinner from '../components/spinner/spinner.js'
import Navbar from '../components/navbar/navbar.js'
import ContactContainer from './contactContainer.jsx'
import Footer from '../components/footer/footer.js'

import Hero from './hero.js'

import HomePage from './homePage.js'
import AccountPage from './accountPage.js'
import PurchasesPage from './purchasesPage.js'
import PurchasePage from './purchasePage.js'
import LoginPage from './loginPage.js'
import ItemPage from './itemPage.js'
import Categories from '../components/categories/categories.js' // import Categories from './categories.js'
import CategoryPage from './categoryPage.js'
import CartPage from './cartPage.js'
import CheckoutPage from './checkoutPage.js'
import CongratulationPurchase from '../components/congratulationPurchase/congratulationPurchase.js' // import Categories from './categories.js'
import SearchPage from './searchPage.js'
import TermsPage from './termsPage.js'
import MarketingPage from './marketingPage.jsx'
import PaymentGatewayPage from './paymentGatewayPage.jsx'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    const { init } = this.props
    init()
  }

  render() {
    const { isFetching, isEditable } = this.props
    const { stringsNavbar, search, editStoreSwitch, inSession, isAdmin, user, logout } = this.props
    const { username, categories } = this.props
    const { stringsContact, contact, contactSaveButton } = this.props
    const { stringsFooter } = this.props

    return (
      <div>
        <Spinner
          isFetching={isFetching}
        />
        <Navbar
          strings={stringsNavbar}
          search={search}
          inSession={inSession}
          isAdmin={isAdmin}
          isEditable={isEditable}
          editStoreSwitch={editStoreSwitch}
          user={user}
          username={username}
          logout={logout}
        />
        <main className="store__container">
          <Hero/>
          <Switch>
            <Route exact path="/:storeusername/item/:title/:id" component={ ItemPage } />
            <Route exact path="/:storeusername/category/:parent/:category" component={ CategoryPage } />
            <Route exact path="/:storeusername/category/:category" component={ CategoryPage } />
            <Route exact path="/:storeusername/search" component={ SearchPage } />
            <Route exact path="/:storeusername/terms" component={ TermsPage } />
            <Route exact path="/:storeusername/contact" component={ () => (<span/>) } />
            <Route exact path="/:storeusername/cart" component={ CartPage } />
            <Route exact path="/:storeusername/checkout" component={ CheckoutPage } />
            <Route exact path="/:storeusername/congratulation/purchase" component={ CongratulationPurchase } />
            <Route exact path="/:storeusername/categories" component={ () => (<Categories username={username} categories={categories} />) } />
            <Route exact path="/:storeusername/login/checkout" component={ () => <LoginPage guest={true} mode={"login"} /> } />
            <Route exact path="/:storeusername/login" component={ () => <LoginPage guest={false} mode={"login"} /> } />
            <Route exact path="/:storeusername/signup" component={ () => <LoginPage guest={false} mode={"signup"} /> } />
            <Route exact path="/:storeusername/account" component={ AccountPage } />
            <Route exact path="/:storeusername/purchase/:id" component={ PurchasePage } />
            <Route exact path="/:storeusername/purchases" component={ PurchasesPage } />
            <Route exact path="/:storeusername/marketing" component={ MarketingPage } />
            <Route exact path="/:storeusername/paymentgateway" component={ PaymentGatewayPage } />
            <Route exact path="/:storeusername" component={HomePage} />
            <Route component={HomePage}/>
          </Switch>
          <ContactContainer
            isEditable={isEditable}
            strings={stringsContact}
            contact={contact}
            contactSaveButton={contactSaveButton}
          />
        </main>
        <Footer
          strings={stringsFooter}
        />
      </div>
    )
  }
}

Store.propTypes = {
  strings: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  inSession: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.any,
  stringsFooter: PropTypes.object.isRequired,
  stringsNavbar: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  editStoreSwitch: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  stringsContact: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  contactSaveButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  strings: '',
  isFetching: state.isFetching,
  isEditable: state.isEditable,
  inSession: state.inSession,
  isAdmin: state.isAdmin,
  user: session.getUser(),
  stringsFooter: Strings(state.language).footer,
  stringsNavbar: Strings(state.language).navbar,
  username: state.store.username,
  categories: state.store.categories,
  stringsContact: Strings(state.language).contactContainer,
  contact: state.store.theme.data.contact
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(loadStore()),
  search: (event) => dispatch(search(event)),
  editStoreSwitch: () => dispatch(editStoreSwitch()),
  logout: () => dispatch(logout()),
  contactSaveButton: (callback) => dispatch(contactSaveButton(callback))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(Store))
