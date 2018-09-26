import React from 'react'
import PropTypes from 'prop-types'

import LogoEdit from '../components/logoEdit/logoEdit'
import LogoModal from '../components/logoModal/logoModal'

const LogoContainer = ({isEditable, logo, strings, loadCanvas, loadPicture, logoSaveButton}) => {
  const init = () => {
    /** this load the modals */
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      var instances = M.Modal.init(elems)
    })
  }

  if (isEditable) {
    return(
      <div className="logo-container">
        <LogoEdit
          strings={strings}
          logo={logo}
        />
        <LogoModal
          strings={strings.modal}
          logo={logo}
          loadCanvas={loadCanvas}
          loadPicture={loadPicture}
          logoSaveButton={logoSaveButton}
        />
        {init()}
      </div>
    )
  } else {
    return(
      <img className="responsive-img" src={require(logo)}/>
    )
  }
}

LogoContainer.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  logoSaveButton: PropTypes.func.isRequired
}

export default LogoContainer
