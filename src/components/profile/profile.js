import React from 'react'
import PropTypes from 'prop-types'

import LogoContainer from '../../containers/logoContainer'

const Profile = ({ isEditable, stringsLogo, logo, loadCanvas, loadPicture, logoSaveButton, name, shortdescription }) => {
  return (
    <div className="sherpon-store-profile">
      <div className="sherpon-row">

        <div className="col s4 m2 l2">
          <LogoContainer
            isEditable={isEditable}
            logo={logo}
            strings={stringsLogo}
            loadCanvas={loadCanvas}
            loadPicture={loadPicture}
            logoSaveButton={logoSaveButton}
          />
        </div>

        <div className="col s8 m10 l10">
          <h5>{name}</h5>
          <h1>{shortdescription}</h1>
        </div>

      </div>
    </div>
  )
}

Profile.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  stringsLogo: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  logoSaveButton: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  shortdescription: PropTypes.string.isRequired
}

export default Profile
