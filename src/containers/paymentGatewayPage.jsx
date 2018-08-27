import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Strings from '../strings'
import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { paymentGatewaySaveButton } from '../actions/store'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import PaymentGatewayView from '../components/paymentGatewayView/paymentGatewayView.jsx'

class PaymentGatewayPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const {
      strings,
      username,
      paymentGateway,
      paymentGatewaySaveButton
    } = this.props

    if ( session.inUserSession() ) {
      return (
        <section>
          <Breadcrumbs
            username={username}
            home={strings.breadcrumbHome}
            route="/marketing"
            parent={null}
            child={strings.breadcrumbAccount}
            onClick={ ()=> true }
            disabledChild={true}
          />
          <PaymentGatewayView
            strings={strings}
            paymentGateway={paymentGateway}
            paymentGatewaySaveButton={paymentGatewaySaveButton}
          />
        </section>
      )
    } else {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

  }
}

PaymentGatewayPage.propsType = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  paymentGateway: PropTypes.object.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).paymentGatewayPage,
  username: state.store.username,
  paymentGateway: state.store.data.paymentGateway,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  paymentGatewaySaveButton: () => dispatch(paymentGatewaySaveButton())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(PaymentGatewayPage))
