import React from 'react'
import PropTypes from 'prop-types'

import style from './homeSectionCreateButton.scss'

const strings = {
  ES: require('./strings/homeSectionCreateButton.ES.json'),
  EN: require('./strings/homeSectionCreateButton.EN.json')
}

const CreateSection = ({ language }) => {

  return(
    <div className="home-section-create-button">
      <a className="modal-trigger" href="#sectionModal">
        {strings[language].title}
      </a>
    </div>
  )
}

CreateSection.propTypes = {
  language: PropTypes.string.isRequired
}

export default CreateSection
