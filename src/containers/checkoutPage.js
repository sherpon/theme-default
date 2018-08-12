import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { placeOrder } from '../actions/cart'
import Strings from '../strings'

import CheckoutView from '../components/checkoutView/checkoutView'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel } = this.props
    analytics()
    facebookPixel()
  }

  render() {
    const { strings, cart, placeOrder } = this.props

    return(
      <CheckoutView
        strings={strings}
        cart={cart}
        placeOrder={placeOrder}
      />
    )
  }
}

CheckoutPage.propTypes = {
  strings: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).checkoutPage,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {},
  placeOrder: () => dispatch(placeOrder())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CheckoutPage))