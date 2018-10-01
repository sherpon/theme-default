import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { marketingSaveButton } from '../actions/store/data'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import MarketingView from '../components/marketingView/marketingView.jsx'

const strings = {
  ES: {
    breadcrumbMarketing:'Marketing'
  },
  EN: {
    breadcrumbMarketing:''
  }
}

class MarketingPage extends React.Component {
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
      analyticsTrackerId,
      facebookPixelId,
      marketingSaveButton
     } = this.props

    if ( session.inUserSession() ) {
      return (
        <section>
          <Breadcrumbs
            username={username}
            language={language}
            route="/marketing"
            parent={null}
            child={strings[language].breadcrumbMarketing}
            onClick={ ()=> true }
            disabledChild={true}
          />
          <MarketingView
            language={language}
            analyticsTrackerId={analyticsTrackerId}
            facebookPixelId={facebookPixelId}
            marketingSaveButton={marketingSaveButton}
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

MarketingPage.propsType = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  //strings: Strings(state.language).marketingPage,
  language: state.language,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  marketingSaveButton: () => dispatch(marketingSaveButton())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(MarketingPage))
