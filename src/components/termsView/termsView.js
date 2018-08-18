import React from 'react'
import PropTypes from 'prop-types'

const TermsView = ({strings, terms}) => {
  return (
    <section className="terms-view">
      <div className="">
        <h5>{strings.labelExchange}</h5>
        <div>
          {terms.exchange}
        </div>
      </div>

      <div className="terms-view__line">
        <h5>{strings.labelRefund}</h5>
        <div>
          {terms.refund}
        </div>
      </div>
    </section>
  )
}

TermsView.propTypes = {
  strings: PropTypes.object.isRequired,
  terms: PropTypes.object.isRequired
}

export default TermsView
