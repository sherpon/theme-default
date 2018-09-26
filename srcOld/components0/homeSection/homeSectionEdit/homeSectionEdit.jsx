import React from 'react'
import PropTypes from 'prop-types'

import HomeSectionView from '../homeSectionView/homeSectionView.jsx'

const HomeSectionEdit = ({
    index,
    strings,
    username,
    section,
    noLinkEspace,
    homeSectionDeleteButton
  }) => {

  const _homeSectionDeleteButton = () => {
    homeSectionDeleteButton(index)
  }

  return (
    <div className="home-section-edit">
      <div className="home-section-edit__edit-bar">
        <a
          onClick={ () => homeSectionDeleteButton(index) }
        >
          {strings.labelDelete}
        </a>
      </div>
      <HomeSectionView
        username={username}
        section={section}
        noLinkEspace={noLinkEspace}
      />
    </div>
  )
}

HomeSectionEdit.propTypes = {
  index: PropTypes.number.isRequired,
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  noLinkEspace: PropTypes.func.isRequired,
  homeSectionDeleteButton: PropTypes.func.isRequired
}

export default HomeSectionEdit
