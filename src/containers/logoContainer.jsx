import React from 'react'
import { connect } from 'react-redux'

import placeholderLogo from '../images/store/placeholderLogo.png'
/** actions */
import { logoSaveButton } from '../actions/store/logo'

/** models */
import { loadCanvas, loadPicture } from '../models/canvas'

/** models */
import Logo from '../components/logo'

const LogoContainer = ({ language, isEditable, logo, logoSaveButton }) => {
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
        <Logo.Edit
          language={language}
          logo={logo}
        />
        <Logo.Modal
          language={language}
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
      <Logo.View
        logo={logo}
      />
    )
  }
}

const mapStateToProps = state => ({
  language: state.language,
  isEditable: state.isEditable,
  logo: ( state.store.theme.data.logo !== '' ) ? ( state.store.theme.data.logo ) : ( placeholderLogo )
})

const mapDispatchToProps = dispatch => ({
  logoSaveButton: (callback) => dispatch(logoSaveButton(callback))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoContainer)
