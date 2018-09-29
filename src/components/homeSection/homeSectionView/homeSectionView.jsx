import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './homeSectionView.scss'

const HomeSectionView = ({ username, section, noLinkEspace }) => {
  return (
    <div className="home-section-view">
      <Link
        to={`/${username}${noLinkEspace(section.to)}`}
      >
        <img className="sherpon-box sherpon-margin-bottom-5px responsive-img hide-on-small-only" src={`${section.pictureDesktop}`} alt={section.pictureAlt}/>
        <img className="sherpon-box sherpon-margin-bottom-5px responsive-img hide-on-med-and-up" src={`${section.pictureMobile}`} alt={section.pictureAlt}/>
      </Link>
    </div>
  )
}

HomeSectionView.propTypes = {
  username: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired,
  noLinkEspace: PropTypes.func.isRequired
}

export default HomeSectionView
