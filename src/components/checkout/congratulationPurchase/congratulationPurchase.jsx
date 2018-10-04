import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { pageView } from '../../../models/analytics'
import { pixelPageView } from '../../../models/facebookPixel'

import style from './congratulationPurchase.scss'

const _strings = {
  ES: require('./strings/congratulationPurchase.ES.json'),
  EN: require('./strings/congratulationPurchase.EN.json')
}

class CongratulationPurchase extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel } = this.props
    analytics()
    facebookPixel()
  }

  render() {
    const { language } = this.props
    const strings = _strings[language]

    return (
      <div className="congratulation-purchase">
        <div className="congratulation-purchase__title">
          {strings.labelTitle}
        </div>
        <p className="congratulation-purchase__line">
          {strings.label1}
        </p>
        <p className="congratulation-purchase__line">
          {strings.label2}
        </p>
        <p className="congratulation-purchase__line">
          {strings.label3}
        </p>
        <p className="congratulation-purchase__line">
          {strings.label4}
        </p>
      </div>
    )
  }
}

CongratulationPurchase.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId)
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CongratulationPurchase)
