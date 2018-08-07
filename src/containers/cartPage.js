import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { deleteItemCart, checkout } from '../actions/cart'
import Strings from '../strings'

import EmptyCartView from '../components/emptyCartView/emptyCartView'
import CartView from '../components/cartView/cartView'

class CartPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel } = this.props
    analytics()
    facebookPixel()
  }

  render() {
    const { quantityCart, strings, username, cart, deleteItemCart, checkout } = this.props

    if (quantityCart===0) {
      return(
        <EmptyCartView
          labelCartEmpty={strings.labelCartEmpty}
        />
      )
    } else {
      return(
        <section className="cart-page">
          <CartView
            username={username}
            strings={strings}
            cart={cart}
            deleteItemCart={deleteItemCart}
            checkout={checkout}
          />
        </section>
      )
    }

      
  }
}

CartPage.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  quantityCart: PropTypes.number.isRequired,
  cart: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).cartPage,
  username: state.storeState.username,
  quantityCart: state.cart.quantity,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {},
  deleteItemCart: (index) => dispatch(deleteItemCart(index)),
  checkout: () => dispatch(checkout())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CartPage))