import React from 'react'
import PropTypes from 'prop-types'

const Cover = ({strings}) => {
  return (
    <footer className="footer__container">
      <div className="sherpon-footer">
        {strings.message}<br/>
        {strings.copyright}
      </div>
    </footer>
  )
}

Cover.propTypes = {
  strings: PropTypes.object.isRequired
}

export default Cover