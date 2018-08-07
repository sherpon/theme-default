import React from 'react'
import PropTypes from 'prop-types'

const Terms = ({strings, isEditable, terms, init }) => {
  return (
    <section className="sherpon-box sherpon-terms">
      <h5>{strings.title}</h5>
      <div>
        {strings.terms}
      </div>
    </section>
  )
}

Terms.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  terms: PropTypes.object.isRequired
}

export default Terms