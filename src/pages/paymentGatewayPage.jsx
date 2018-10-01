import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { paymentGatewaySaveButton } from '../actions/store/data'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import PaymentGatewayView from '../components/paymentGatewayView/paymentGatewayView.jsx'

const strings = {
  ES: {
    breadcrumbAccount:'Método de pago'
  },
  EN: {
    breadcrumbAccount:''
  }
}

class PaymentGatewayPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const {
      language,
      username,
      paymentGateway,
      paymentGatewaySaveButton
    } = this.props

    if ( session.inUserSession() ) {
      return (
        <section>
          <Breadcrumbs
            username={username}
            language={language}
            route="/payment"
            parent={null}
            child={strings[language].breadcrumbAccount}
            onClick={ ()=> true }
            disabledChild={true}
          />
          <PaymentGatewayView
            language={language}
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
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  paymentGateway: PropTypes.object.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
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
