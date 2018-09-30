import React from 'react'
import PropTypes from 'prop-types'

import style from './resultCount.scss'

const _strings = {
  ES:require('./strings/resultCount.ES.json'),
  EN:require('./strings/resultCount.EN.json')
}

const ResultCount = ({itemsCount, language, query}) => {
  const strings = _strings[language]
  return (
    <div className="sherpon-box sherpon-result-count">
      {`${itemsCount} ${strings.labelResult} \"${query}\"`}
    </div>
  )
}



ResultCount.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
}

export default ResultCount
