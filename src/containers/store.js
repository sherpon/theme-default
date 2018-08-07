import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadStore, search } from '../actions'
import Strings from '../strings'

import Spinner from '../components/spinner/spinner.js'
import Navbar from '../components/navbar/navbar.js'
import Contact from '../components/contact/contact.js'
import Footer from '../components/footer/footer.js'

import Hero from './hero.js'

import HomePage from './homePage.js'
import LoginPage from './loginPage.js'
import ItemPage from './itemPage.js'
import Categories from '../components/categories/categories.js' // import Categories from './categories.js'
import CategoryPage from './categoryPage.js'
import CartPage from './cartPage.js'
import SearchPage from './searchPage.js'
import Terms from './terms.js'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    const { init } = this.props
    init()
  }

  render() {
    const { isFetching, isEditable } = this.props
    const { stringsNavbar, search } = this.props
    const { username, categories } = this.props
    const { stringsContact, contact } = this.props
    const { stringsFooter } = this.props

    return (
      <div>
        <Spinner
          isFetching={isFetching}
        />
        <Navbar
          strings={stringsNavbar}
          search={search}
        />
        <main className="store__container">
          <Hero/>
          <Switch>
            <Route exact path="/:storeusername/item/:title/:id" component={ ItemPage } />
            <Route exact path="/:storeusername/category/:parent/:category" component={ CategoryPage } />
            <Route exact path="/:storeusername/category/:category" component={ CategoryPage } />
            <Route exact path="/:storeusername/search" component={ SearchPage } />
            <Route exact path="/:storeusername/terms" component={ Terms } />
            <Route exact path="/:storeusername/contact" component={ () => (<span/>) } />
            <Route exact path="/:storeusername/cart" component={ CartPage } />
            <Route exact path="/:storeusername/checkout" component={ () => (<span/>) } />
            <Route exact path="/:storeusername/categories" component={ () => (<Categories username={username} categories={categories} />) } />
            <Route exact path="/:storeusername/login" component={LoginPage} />
            <Route exact path="/:storeusername" component={HomePage} />
            <Route component={HomePage}/>
          </Switch>
          <Contact
            strings={stringsContact}
            isEditable={isEditable}
            contact={contact}
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
  stringsContact: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  stringsFooter: PropTypes.object.isRequired,
  stringsNavbar: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  strings: '',
  isFetching: state.isFetching,
  isEditable: state.isEditable,
  stringsContact: Strings(state.language).contact,
  contact: state.storeState.contact,
  stringsFooter: Strings(state.language).footer,
  stringsNavbar: Strings(state.language).navbar,
  username: state.storeState.username,
  categories: state.storeState.categories
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(loadStore()),
  search: (event) => {
    dispatch(search(event))
  }
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(Store))