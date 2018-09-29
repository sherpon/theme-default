import React from 'react'
import PropTypes from 'prop-types'

import style from './categoriesCreator.scss'

const _strings = {
  ES:require('./strings/categoriesCreator.ES.json'),
  EN:require('./strings/categoriesCreator.EN.json')
}

const CategoriesCreator = ({
    language
  }) => {
  const strings = _strings[language]
  return(
    <div className="categories-creator">
        <a className="modal-trigger" href="#categories-modal">
          {strings.titleCreator}
        </a>
    </div>
  )
}

CategoriesCreator.propTypes = {
  language: PropTypes.string.isRequired
}

export default CategoriesCreator
