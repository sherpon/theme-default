import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

const ProductEditorInformation = ({ strings, product }) => {

  const init = () => {
    setTimeout( () => {
      $('#product-editor-information__description').val( ( product === undefined ) ? ('') : (product.description) )
      $('#product-editor-information__characteristics').val( ( product === undefined ) ? ('') : (product.characteristics) )
      $('#product-editor-information__include').val( ( product === undefined ) ? ('') : (product.include) )
      M.updateTextFields()
      M.textareaAutoResize($('#product-editor-information__description'))
      M.textareaAutoResize($('#product-editor-information__characteristics'))
      M.textareaAutoResize($('#product-editor-information__include'))
    },1000 )
  }

  return (
    <div className="product-editor-information">
      <div className="product-editor__row">
        {strings.labelInformationTitle}
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-information__shortTitle" type="text"
          defaultValue={ ( product === undefined ) ? ('') : (product.shortTitle) }
        />
        <label htmlFor="product-editor-information__shortTitle">
          {strings.labelInformationShortTitle}
        </label>
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-information__longTitle" type="text"
          defaultValue={ ( product === undefined ) ? ('') : (product.longTitle) }
        />
        <label htmlFor="product-editor-information__longTitle">
          {strings.labelInformationLongTitle}
        </label>
      </div>

      <div className="input-field">
        <textarea id="product-editor-information__description" className="materialize-textarea"></textarea>
        <label htmlFor="product-editor-information__description">
          {strings.labelInformationDescription}
        </label>
      </div>

      <div className="input-field">
        <textarea id="product-editor-information__characteristics" className="materialize-textarea"></textarea>
        <label htmlFor="product-editor-information__characteristics">
          {strings.labelInformationCharacteristics}
        </label>
      </div>

      <div className="input-field">
        <textarea id="product-editor-information__include" className="materialize-textarea"></textarea>
        <label htmlFor="product-editor-information__include">
          {strings.labelInformationInclude}
        </label>
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-information__stock" type="number"
          defaultValue={ ( product === undefined ) ? (0) : (product.stock) }
        />
        <label htmlFor="product-editor-information__stock">
          {strings.labelInformationStock}
        </label>
      </div>
      {init()}
    </div>
  )
}

ProductEditorInformation.propTypes = {
  strings: PropTypes.object.isRequired
}

export default ProductEditorInformation
