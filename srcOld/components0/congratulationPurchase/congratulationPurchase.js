import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Strings from '../../strings'

class CongratulationPurchase extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel } = this.props
    analytics()
    facebookPixel()
  }

  render() {
    const { strings } = this.props

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
  strings: Strings(state.language).congratulationPurchase,
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {}
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CongratulationPurchase)
