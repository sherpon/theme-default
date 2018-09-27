import React from 'react'
import PropTypes from 'prop-types'

import style from './shortDescriptionEdit.scss'

const _strings = {
  ES:require('./strings/shortDescriptionEdit.ES.json'),
  EN:require('./strings/shortDescriptionEdit.EN.json')
}

const ShortDescriptionEdit = ({language, shortDescription}) => {
  const strings = _strings[language]
  return(
    <div className="short-description-edit">
      <h6>{shortDescription}</h6>
      <div className="short-description-edit__edit-bar">
        <a className="modal-trigger" href="#short-description-modal">
          {strings.labelEdit}
        </a>
      </div>
    </div>
  )
}

ShortDescriptionEdit.propTypes = {
  language: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired
}

export default ShortDescriptionEdit
