import React from 'react'
import PropTypes from 'prop-types'

import style from './contactEditButton.scss'

const _strings = {
  ES:require('./strings/contactEditButton.ES.json'),
  EN:require('./strings/contactEditButton.EN.json')
}

const ContactEditButton = ({ language }) => {
  const strings = _strings[language]
  return(
    <div className="contact-edit-button">

      <a className="modal-trigger" href="#contact-modal">
        {strings.labelEdit}
      </a>

    </div>
  )
}

ContactEditButton.propTypes = {
  language: PropTypes.string.isRequired
}

export default ContactEditButton
