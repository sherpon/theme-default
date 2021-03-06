import React from 'react'
import PropTypes from 'prop-types'

import HomeSection from '../components/homeSection'

const HomeSectionContainer = ({
    isEditable,
    strings,
    index,
    username,
    section,
    noLinkEspace,
    homeSectionDeleteButton
  }) => {

  if (isEditable) {
    return(
      <div className="home-section-container">
        <HomeSection.Edit
          index={index}
          strings={strings}
          username={username}
          section={section}
          noLinkEspace={noLinkEspace}
          homeSectionDeleteButton={homeSectionDeleteButton}
        />
        {/*
          <HomeSection.Modal
            strings={strings.modal}
            section={section}
            sectionSaveButton={sectionSaveButton}
          />
        */}
      </div>
    )
  } else {
    return(
      <HomeSection.View
        username={username}
        section={section}
        noLinkEspace={noLinkEspace}
      />
    )
  }
}

HomeSectionContainer.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  strings: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  noLinkEspace: PropTypes.func.isRequired,
  homeSectionDeleteButton: PropTypes.func.isRequired
}

export default HomeSectionContainer
