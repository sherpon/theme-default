import React from 'react'
import PropTypes from 'prop-types'

const LogoEdit = ({strings, logo}) => {
  return(
    <div className="logo-edit">
      <img className="responsive-img" src={logo}/>
      <div className="logo-edit__edit-bar">
        <a className="modal-trigger" href="#logo-modal">
          {strings.labelEdit}
        </a>
      </div>
    </div>
  )
}

LogoEdit.propTypes = {
  strings: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired
}

export default LogoEdit
