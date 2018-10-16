import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { shippingCreateButton } from '../actions/store/data'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import Shipping from '../components/shipping'

const strings = {
  ES: {
    breadcrumbShipping:'Métodos de envío'
  },
  EN: {
    breadcrumbShipping:''
  }
}

class ShippingPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { language, username, isFetching, shipping, shippingCreateButton } = this.props

    if ( !session.inUserSession() ) {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

    return (
      <section>
        <Breadcrumbs
          username={username}
          language={language}
          route="/shipping"
          parent={null}
          child={strings[language].breadcrumbShipping}
          onClick={ ()=> true }
          disabledChild={true}
        />
        <Shipping.CreatorButton
          language={language}
        />
        <Shipping.Modal
          language={language}
          shippingCreateButton={shippingCreateButton}
        />
        <Shipping.List
          language={language}
          shippingList={shipping}
        />
      </section>
    )

  }
}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  isFetching: state.isFetching,
  shipping: state.store.data.shipping
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  shippingCreateButton: () => dispatch(shippingCreateButton())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ShippingPage))
