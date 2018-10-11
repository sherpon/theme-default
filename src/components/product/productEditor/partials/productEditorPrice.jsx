import React from 'react'
import PropTypes from 'prop-types'

const ProductEditorPrice = ({ strings, product }) => {

  return (
    <div className="product-editor-price">

      <div className="product-editor__row">
        {strings.labelPriceTitle}
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-price__amount" type="number"
          defaultValue={ ( product === undefined ) ? (0) : (product.price) }
        />
        <label htmlFor="product-editor-price__amount">
          {strings.labelPriceAmount}
        </label>
      </div>

      <div className="input-field product-editor__row">
        <select id="product-editor-price__currency"
          defaultValue={ ( product === undefined ) ? ('{}') : (`{ "symbol":"${product.symbol}", "currency":"${product.currency}" }`) }
        >
          <option value='{}' disabled>-</option>
          <option value='{ "symbol":"S/.", "currency":"PEN" }'>Soles</option>
          <option value='{ "symbol":"$", "currency":"USD" }'>Dólares</option>
        </select>
        <label htmlFor="product-editor-price__currency">
          {strings.labelPriceCurrency}
        </label>
      </div>

    </div>
  )
}

ProductEditorPrice.propTypes = {
  strings: PropTypes.object.isRequired
}

export default ProductEditorPrice
