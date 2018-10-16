import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  deleteItemCart,
  checkout,
  onChangedShippingSelect
} from '../actions/cart/cart'

import Strings from '../strings'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

//import EmptyCartView from '../components/emptyCartView/emptyCartView'
//import CartView from '../components/cartView/cartView'
import Cart from '../components/cart'

class CartPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { quantityCart, language, username, cart, shipping, deleteItemCart, checkout, onChangedShippingSelect } = this.props

    if (quantityCart===0) {
      return(
        <Cart.ViewEmpty
          language={language}
        />
      )
    } else {
      return(
        <section className="cart-page">
          <Cart.View
            username={username}
            language={language}
            cart={cart}
            shipping={shipping}
            onChangedShippingSelect={onChangedShippingSelect}
            deleteItemCart={deleteItemCart}
            checkout={checkout}
          />
        </section>
      )
    }
  }
}

/*CartPage.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  quantityCart: PropTypes.number.isRequired,
  cart: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}*/

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  quantityCart: state.cart.quantity,
  cart: state.cart,
  shipping: state.store.data.shipping
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  deleteItemCart: (index) => dispatch(deleteItemCart(index)),
  checkout: () => dispatch(checkout()),
  onChangedShippingSelect: () => dispatch(onChangedShippingSelect())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CartPage))
