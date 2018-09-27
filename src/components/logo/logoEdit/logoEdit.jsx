import React from 'react'
import PropTypes from 'prop-types'

import style from './logoEdit.scss'

const _strings = {
  ES:require('./strings/logoEdit.ES.json'),
  EN:require('./strings/logoEdit.EN.json')
}

const LogoEdit = ({language, logo}) => {
  const strings = _strings[language]
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
  language: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
}

export default LogoEdit
