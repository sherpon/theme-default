import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './productCreatorButton.scss'

const strings = {
  ES: require('./strings/productCreatorButton.ES.json'),
  EN: require('./strings/productCreatorButton.EN.json')
}

const ProductCreatorButton = ({ username, language }) => {

  return (
    <div className="product-creator-button">

      <Link className="product-creator-button__title" to={`/${username}/product/new`}>
        {strings[language].creatorButton}
      </Link>

    </div>
  )
}

ProductCreatorButton.propTypes = {
  username: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
}

export default ProductCreatorButton
