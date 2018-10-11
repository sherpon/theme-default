import React from 'react'
import PropTypes from 'prop-types'

const ProductEditorShipping = ({ strings, product }) => {
  let shipping = {
    price: 0,
    symbol: '',
    currency: '',
    days: 0
  }

  if (product===undefined) {
    shipping = {
      price: 0,
      symbol: '',
      currency: '',
      days: 0
    }
  } else {
    if (product.shipping.length===0) {
      shipping = {
        price: 0,
        symbol: '',
        currency: '',
        days: 0
      }
    } else {
      shipping = product.shipping[0]
    }

  }

  return (
    <div className="product-editor-shipping">
      <div className="product-editor__row">
        {strings.labelShippingTitle}
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-shipping__price" type="number"
          defaultValue={ ( product === undefined ) ? (0) : (shipping.price) }
        />
        <label htmlFor="product-editor-shipping__price">
          {strings.labelShippingPrice}
        </label>
      </div>

      <div className="input-field product-editor__row">
        <select id="product-editor-shipping__currency"
          defaultValue={ ( product === undefined ) ? ('{}') : (`{ "symbol":"${shipping.symbol}", "currency":"${shipping.currency}" }`) }
        >
          <option value='{}' disabled>-</option>
          <option value='{ "symbol":"S/.", "currency":"PEN" }'>Soles</option>
          <option value='{ "symbol":"$", "currency":"USD" }'>Dólares</option>
        </select>
        <label htmlFor="product-editor-shipping__currency">
          {strings.labelShippingCurrency}
        </label>
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-shipping__time" type="number"
          defaultValue={ ( product === undefined ) ? (0) : (shipping.days) }
        />
        <label htmlFor="product-editor-shipping__time">
          {strings.labelShippingTime}
        </label>
      </div>

    </div>
  )
}

ProductEditorShipping.propTypes = {
  strings: PropTypes.object.isRequired
}

export default ProductEditorShipping
