import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Strings from '../strings'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import TermsView from '../components/termsView/termsView.js'

class TermsPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { strings, terms } = this.props
    return(
      <TermsView
        strings={strings}
        terms={terms}
      />
    )
  }
}

TermsPage.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  terms: PropTypes.object.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  strings: Strings(state.language).termsPage,
  isEditable: state.isEditable,
  terms: state.store.terms,
  analyticsTrackerId: state.store.analytics,
  facebookPixelId: state.store.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId)
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(TermsPage)
