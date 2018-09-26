import React from 'react'
import PropTypes from 'prop-types'

const ResultCount = ({itemsCount, label, query}) => (
  <div className="sherpon-box sherpon-result-count">
    {`${itemsCount} ${label} \"${query}\"`}
  </div>
)

ResultCount.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
}

export default ResultCount