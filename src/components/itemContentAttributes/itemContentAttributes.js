import React from 'react'
import PropTypes from 'prop-types'

import { getPriceFormat } from '../../models/tools'

const ItemContentAttributes = ({ type, onChangedSelect, labelModel, labelSize, labelColor, attributes, variations }) => {
  if (type==='clothes') {
    const init = () => {
      $(document).ready(function(){
        $('select').formSelect()
      })
    }

    const sizeOptions = attributes[0].map( (size, i) => {
      return (
        <option 
          key={i}
          value={size}
        >
          {`${size}`}
        </option>
      )
    })

    const colorOptions = attributes[1].map( (color, i) => {
      return (
        <option 
          key={i}
          value={color}
        >
          {`${color}`}
        </option>
      )
    })

    return (
      <div className="item-content-attributes">
        <div className="input-field item-content-attributes__size-field">
          <select id="item-content-attributes__size" onChange={ () => onChangedSelect() } defaultValue="">
            <option value="" disabled>-</option>
            {sizeOptions}
          </select>
          <label htmlFor="item-content-attributes__size">{labelSize}</label>
        </div>

        <div className="input-field">
          <select id="item-content-attributes__color" onChange={ () => onChangedSelect() } defaultValue="">
            <option value="" disabled>-</option>
            {colorOptions}
          </select>
          <label htmlFor="item-content-attributes__color">{labelColor}</label>
        </div>
        {init()}
      </div>
    )
  } else if (type==='models') {
    const init = () => {
      $(document).ready(function(){
        $('select').formSelect()
      })
    }

    const modelOptions = attributes[0].map( (model, i) => {
      return (
        <option 
          key={i}
          value={model}
        >
          {`${model}`}
        </option>
      )
    })

    return (
      <div className="item-content-attributes">
        <div className="input-field item-content-attributes__model-field">
          <select id="item-content-attributes__model" onChange={ () => onChangedSelect() } defaultValue="">
            <option value="" disabled>-</option>
            {modelOptions}
          </select>
          <label htmlFor="item-content-attributes__model">{labelModel}</label>
        </div>
        {init()}
      </div>
    )
  } else {
    return (
      <div/>
    )
  }
}

ItemContentAttributes.propTypes = {
  type: PropTypes.string.isRequired,
  onChangedSelect: PropTypes.func.isRequired,
  labelModel: PropTypes.string.isRequired,
  labelSize: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  variations: PropTypes.array.isRequired
}

export default ItemContentAttributes