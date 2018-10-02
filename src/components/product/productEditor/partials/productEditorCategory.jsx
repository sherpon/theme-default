import React from 'react'
import PropTypes from 'prop-types'

const ProductEditorCategory = ({ strings, categories }) => {
  //const categories = []
  let selectDestinationOptions = []
  for ( let i = 0 ; i < categories.length ; i++ ) {
    const parent = categories[i]
    const parentKey = i*1000
    let tmpParent = {...parent}
    delete tmpParent.children /** delete all children*/
    selectDestinationOptions.push(
      <option
        key={parentKey}
        value={JSON.stringify([tmpParent])}
      >
        {`${parent.name}`}
      </option>
    )

    for ( let j = 0 ; j < parent.children.length ; j++ ) {
      const child = parent.children[j]
      const childKey = (i*1000)+j+1
      selectDestinationOptions.push(
        <option
          key={childKey}
          value={JSON.stringify([tmpParent,child])}
        >
          {`${parent.name} - ${child.name}`}
        </option>
      )
    }

  }

  return (
    <div className="product-editor-category">

      <div className="product-editor__row">
        {strings.labelCategoryTitle}
      </div>

      <div className="input-field product-editor__row">
        <select id="product-editor-category__category" defaultValue="[]">
          <option value="[]" disabled>-</option>
          { selectDestinationOptions.map( (option) => (option) ) }
        </select>
        <label htmlFor="product-editor-category__category">
          {strings.labelCategorySelect}
        </label>
      </div>

    </div>
  )
}

ProductEditorCategory.propTypes = {
  strings: PropTypes.object.isRequired
}

export default ProductEditorCategory
