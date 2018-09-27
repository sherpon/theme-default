import React from 'react'
import PropTypes from 'prop-types'

import style from './footer.scss'

const strings = {
  ES:require('./strings/footer.ES.json'),
  EN:require('./strings/footer.EN.json')
}

const Footer = ({language}) => {
  return (
    <footer className="container">
      <div className="footer">
        {strings[language].message}<br/>
        {strings[language].copyright}
      </div>
    </footer>
  )
}

Footer.propTypes = {
  language: PropTypes.string.isRequired
}

export default Footer
