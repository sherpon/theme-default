import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductCreatorButton = ({ username, title }) => {

  return(
    <div className="product-creator-button">

      <Link className="product-creator-button__title" to={`/${username}/product/new`}>
        {title}
      </Link>

    </div>
  )
}

ProductCreatorButton.propTypes = {
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default ProductCreatorButton
