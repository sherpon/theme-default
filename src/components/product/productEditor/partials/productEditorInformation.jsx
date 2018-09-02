import React from 'react'
import PropTypes from 'prop-types'

const ProductEditorInformation = ({ strings }) => {

  return (
    <div className="product-editor-information">
      <div className="product-editor__row">
        {strings.labelInformationTitle}
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-information__shortTitle" type="text" defaultValue={''}/>
        <label htmlFor="product-editor-information__shortTitle">
          {strings.labelInformationShortTitle}
        </label>
      </div>

      <div className="input-field product-editor__row">
        <input id="product-editor-information__longTitle" type="text" defaultValue={''}/>
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
        <input id="product-editor-information__stock" type="number" defaultValue={0}/>
        <label htmlFor="product-editor-information__stock">
          {strings.labelInformationStock}
        </label>
      </div>

    </div>
  )
}

ProductEditorInformation.propTypes = {
  strings: PropTypes.object.isRequired
}

export default ProductEditorInformation
