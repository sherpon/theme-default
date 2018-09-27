import React from 'react'
import PropTypes from 'prop-types'

import style from './logoView.scss'

const LogoView = ({logo}) => {
  return(
    <div className="logo-view">
      <img className="responsive-img" src={logo}/>
    </div>
  )
}

LogoView.propTypes = {
  logo: PropTypes.string.isRequired
}

export default LogoView
