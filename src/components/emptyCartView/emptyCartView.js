import React from 'react'
import PropTypes from 'prop-types'

const EmptyCartView = ({labelCartEmpty}) => {
  return (
    <div className="empty-cart-view">
      {labelCartEmpty}
    </div>
  )
}

EmptyCartView.propTypes = {
  labelCartEmpty: PropTypes.string.isRequired
}

export default EmptyCartView