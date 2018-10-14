import React from 'react'
import PropTypes from 'prop-types'

import style from './homeSectionEdit.scss'

const _strings = {
  ES: require('./strings/homeSectionEdit.ES.json'),
  EN: require('./strings/homeSectionEdit.EN.json')
}

import HomeSectionView from '../homeSectionView/homeSectionView.jsx'

const HomeSectionEdit = ({
    index,
    language,
    username,
    section,
    sectionLink,
    noLinkEspace,
    homeSectionDeleteButton
  }) => {
  const strings = _strings[language]

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
        sectionLink={sectionLink}
        noLinkEspace={noLinkEspace}
      />
    </div>
  )
}

HomeSectionEdit.propTypes = {
  index: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  noLinkEspace: PropTypes.func.isRequired,
  homeSectionDeleteButton: PropTypes.func.isRequired
}

export default HomeSectionEdit
