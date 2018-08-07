import React from 'react'
import PropTypes from 'prop-types'

const Spinner = ({ isFetching }) => (
  <div
    id="sherpon-spinner"
    style={{
      display: isFetching ? 'unset' : 'none'
    }}
  >
    <div id="" className="progress" >
      <div className="indeterminate"></div>
    </div>
  </div>
)

Spinner.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default Spinner