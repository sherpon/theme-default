import React from 'react'
import PropTypes from 'prop-types'

import ProductEditorPictures from './partials/productEditorPictures.jsx'
import ProductEditorInformation from './partials/productEditorInformation.jsx'
import ProductEditorPrice from './partials/productEditorPrice.jsx'
import ProductEditorShipping from './partials/productEditorShipping.jsx'
import ProductEditorCategory from './partials/productEditorCategory.jsx'

import style from './productEditor.scss'

const _strings = {
  ES: require('./strings/productEditor.ES.json'),
  EN: require('./strings/productEditor.EN.json')
}

const ProductEditor = ({ language, categories, loadCanvas, loadPicture, createNewProduct }) => {
  const strings = _strings[language]
  const init = () => {
    /*$(document).ready(function(){
      $('select').formSelect()
    })*/
    setTimeout( () => {
      M.updateTextFields()
      var elems = document.querySelectorAll('select')
      var instances = M.FormSelect.init(elems)
    },100 )
  }

  return (
    <div className="product-editor">
      <div className="product-editor__title">
        {strings.labelTitle}
      </div>

      <ProductEditorPictures
        strings={strings}
        loadCanvas={loadCanvas}
        loadPicture={loadPicture}
      />

      <ProductEditorInformation
        strings={strings}
      />

      <ProductEditorPrice
        strings={strings}
      />

      <ProductEditorShipping
        strings={strings}
      />

      <ProductEditorCategory
        strings={strings}
        categories={categories}
      />

      <div className="product-editor__button">
        <a
          onClick={ () => createNewProduct() }
          className="waves-effect waves-light btn-small z-depth-0"
        >
          {strings.buttonCreateProduct}
        </a>
      </div>

      {init()}

    </div>
  )
}

ProductEditor.propTypes = {
  language: PropTypes.string.isRequired
}

export default ProductEditor
