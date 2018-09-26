import React from 'react'
import PropTypes from 'prop-types'

import style from './spinner.scss'

const Spinner = ({ isFetching }) => (
  <div
    className="c-spinner"
    style={{
      display: isFetching ? 'unset' : 'none'
    }}
  >
    <div className="progress" >
      <div className="indeterminate"></div>
    </div>
  </div>
)

Spinner.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default Spinner
