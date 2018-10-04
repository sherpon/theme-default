import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { placeOrder } from '../actions/cart/cart'

import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import CheckoutView from '../components/checkout/checkoutView/checkoutView.jsx'

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { language, cart, placeOrder } = this.props

    return(
      <CheckoutView
        language={language}
        cart={cart}
        placeOrder={placeOrder}
      />
    )
  }
}

CheckoutPage.propTypes = {
  language: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  placeOrder: () => dispatch(placeOrder())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CheckoutPage))
