import React from 'react'
import PropTypes from 'prop-types'

import style from './cartViewEmpty.scss'

const strings = {
  ES: require('./strings/cartViewEmpty.ES.json'),
  EN: require('./strings/cartViewEmpty.EN.json')
}

const CartViewEmpty = ({ language }) => {
  return (
    <div className="cart-view-empty">
      {strings[language].labelCartEmpty}
    </div>
  )
}

CartViewEmpty.propTypes = {
  language: PropTypes.string.isRequired
}

export default CartViewEmpty
