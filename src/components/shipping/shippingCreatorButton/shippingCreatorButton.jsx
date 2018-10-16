import React from 'react'
import PropTypes from 'prop-types'

import style from './shippingCreatorButton.scss'

const strings = {
  ES: require('./strings/shippingCreatorButton.ES.json'),
  EN: require('./strings/shippingCreatorButton.EN.json')
}

const ShippingCreatorButton = ({ language }) => {

  return (
    <div className="shipping-creator-button">

      <a className="modal-trigger" href="#shipping-modal">
        {strings[language].creatorButton}
      </a>

    </div>
  )
}

ShippingCreatorButton.propTypes = {
  language: PropTypes.string.isRequired
}

export default ShippingCreatorButton
