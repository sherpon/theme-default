import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { deleteItemCart, checkout } from '../actions/cart'
import Strings from '../strings'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import EmptyCartView from '../components/emptyCartView/emptyCartView'
import CartView from '../components/cartView/cartView'

class CartPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
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
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  quantityCart: PropTypes.number.isRequired,
  cart: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).cartPage,
  username: state.store.username,
  analyticsTrackerId: state.store.analytics,
  facebookPixelId: state.store.facebookPixel,
  quantityCart: state.cart.quantity,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  deleteItemCart: (index) => dispatch(deleteItemCart(index)),
  checkout: () => dispatch(checkout())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CartPage))
