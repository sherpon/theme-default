import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { termsSaveButton } from '../actions/store'
import Strings from '../strings'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

//import TermsView from '../components/termsView/termsView.js'
import Terms from '../components/terms'

class TermsPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { isEditable, strings, terms, termsSaveButton } = this.props

    const init = () => {
      /** this load the modals */
      $(document).ready(function(){
        $('.modal').modal()
      })
    }

    if (isEditable) {
      return(
        <div className="terms-container">
          <Terms.Edit
            strings={strings}
            terms={terms}
          />
          <Terms.Modal
            strings={strings.modal}
            terms={terms}
            termsSaveButton={termsSaveButton}
          />
          {init()}
        </div>
      )
    } else {
      return(
        <Terms.View
          strings={strings}
          terms={terms}
        />
      )
    }
  }
}

TermsPage.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  terms: PropTypes.object.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  termsSaveButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  strings: Strings(state.language).termsPage,
  isEditable: state.isEditable,
  terms: state.store.theme.data.terms,
  analyticsTrackerId: state.store.analytics,
  facebookPixelId: state.store.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  termsSaveButton: (callback) => dispatch(termsSaveButton(callback))
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(TermsPage)
