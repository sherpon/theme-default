import React from 'react'
import PropTypes from 'prop-types'

import { getPriceFormat } from '../../models/tools'

const ItemContentShipping = ({ labelShipping, labelFree, shipping }) => {
  if (shipping.length===0) {
    return (
      <div/>
    )
  } else {
    const init = () => {
      $(document).ready(function(){
        $('select').formSelect()
      })
    }

    const selectOptions = shipping.map( (option, i) => {
      const price = (option.price===0) ? (labelFree) : (`${option.symbol} ${getPriceFormat(option.price)}`)
      return (<option 
        key={i}
        value={ JSON.stringify(option) }
      >
        {`${option.description} (${option.days}) - ${price}`}
      </option>)
    } )

    return (
      <div className="item-content-shipping">
        <div className="input-field">
          <select id="item-content-shipping__select" defaultValue="">
            <option value="" disabled>-</option>
            {selectOptions}
          </select>
          <label htmlFor="item-content-shipping__select">{labelShipping}</label>
        </div>
        {init()}
      </div>
    )
  }
}

ItemContentShipping.propTypes = {
  labelShipping: PropTypes.string.isRequired,
  labelFree: PropTypes.string.isRequired,
  shipping: PropTypes.array.isRequired
}

export default ItemContentShipping