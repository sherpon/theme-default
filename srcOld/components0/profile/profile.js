import React from 'react'
import PropTypes from 'prop-types'

import LogoContainer from '../../containers/logoContainer'
import ShortDescriptionContainer from '../../containers/shortDescriptionContainer.jsx'

const Profile = ({
    isEditable,
    logo,
    stringsLogo,
    loadCanvas,
    loadPicture,
    logoSaveButton,
    name,
    shortDescription,
    stringsShortDescription,
    shortDescriptionSaveButton
  }) => {

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
          <ShortDescriptionContainer
            isEditable={isEditable}
            shortDescription={shortDescription}
            strings={stringsShortDescription}
            shortDescriptionSaveButton={shortDescriptionSaveButton}
          />
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
  shortDescription: PropTypes.string.isRequired,
  stringsShortDescription: PropTypes.object.isRequired,
  shortDescriptionSaveButton: PropTypes.func.isRequired
}

export default Profile
