import React from 'react'
import PropTypes from 'prop-types'
//import defaultPicture from '../../../../images/store/placeholderSectionPicture.png'
import defaultPicture from '../img/placeholderSectionPicture.png'

const Picture = ({index, strings, loadPicture, picture}) => {
  return (
    <div className="col s4">
      <label htmlFor={`product-editor-pictures__picture-${index}`}>
        {strings.labelPicturesMessage}
        <canvas id={`product-editor-pictures__picture-${index}__canvas`} className="product-editor-pictures__canvas"></canvas>
      </label>
      <input type='file' id={`product-editor-pictures__picture-${index}`} className="product-editor-pictures__input"
        onChange={ () => loadPicture(`product-editor-pictures__picture-${index}`, `product-editor-pictures__picture-${index}__canvas`, picture) }
      />
    </div>
  )
}

class ProductEditorPictures extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { loadCanvas, product } = this.props
    //const defaultPicture = '/images/store/placeholderSectionPicture.png'
    if (product===undefined) {
      loadCanvas('product-editor-pictures__picture-1__canvas', defaultPicture )
      loadCanvas('product-editor-pictures__picture-2__canvas', defaultPicture )
      loadCanvas('product-editor-pictures__picture-3__canvas', defaultPicture )
      loadCanvas('product-editor-pictures__picture-4__canvas', defaultPicture )
      loadCanvas('product-editor-pictures__picture-5__canvas', defaultPicture )
      loadCanvas('product-editor-pictures__picture-6__canvas', defaultPicture )
      loadCanvas('product-editor-pictures__picture-7__canvas', defaultPicture )
    } else {
      loadCanvas('product-editor-pictures__picture-1__canvas', (product.pictures[0]===undefined) ? (defaultPicture) : (product.pictures[0]) )
      loadCanvas('product-editor-pictures__picture-2__canvas', (product.pictures[1]===undefined) ? (defaultPicture) : (product.pictures[1]) )
      loadCanvas('product-editor-pictures__picture-3__canvas', (product.pictures[2]===undefined) ? (defaultPicture) : (product.pictures[2]) )
      loadCanvas('product-editor-pictures__picture-4__canvas', (product.pictures[3]===undefined) ? (defaultPicture) : (product.pictures[3]) )
      loadCanvas('product-editor-pictures__picture-5__canvas', (product.pictures[4]===undefined) ? (defaultPicture) : (product.pictures[4]) )
      loadCanvas('product-editor-pictures__picture-6__canvas', (product.pictures[5]===undefined) ? (defaultPicture) : (product.pictures[5]) )
      loadCanvas('product-editor-pictures__picture-7__canvas', (product.pictures[6]===undefined) ? (defaultPicture) : (product.pictures[6]) )
    }

  }

  render() {
    const { strings, loadPicture, product } = this.props
    //const defaultPicture = '/images/store/placeholderSectionPicture.png'

    return (
      <div className="product-editor-pictures">

        <div className="product-editor__row">
          {strings.labelPicturesTitle}
        </div>

        <div className="product-editor__row">
          {strings.labelPicturesDimension}
        </div>

        <div className="row ">
          <Picture
            index={'1'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[0]) }
          />
          <div className="col s8">
          </div>
        </div>

        <div className="row ">
          <Picture
            index={'2'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[1]) }
          />
          <Picture
            index={'3'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[2]) }
          />
          <Picture
            index={'4'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[3]) }
          />
        </div>

        <div className="row ">
          <Picture
            index={'5'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[4]) }
          />
          <Picture
            index={'6'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[5]) }
          />
          <Picture
            index={'7'}
            strings={strings}
            loadPicture={loadPicture}
            picture={ (product===undefined) ? (defaultPicture) : (product.pictures[6]) }
          />
        </div>

      </div>
    )
  }

}

/* const ProductEditorPictures = ({ strings, loadCanvas, loadPicture }) => {
  const defaultPicture = '/images/store/placeholderSectionPicture.png'

  const init = () => {
    loadCanvas('product-editor-pictures__picture-1__canvas', defaultPicture)
  }

  return (
    <div className="product-editor-pictures">

      <div className="product-editor__row">
        {strings.labelPicturesTitle}
      </div>

      <div className="product-editor__row">
        {strings.labelPicturesDimension}
      </div>

      <div className="row ">
        <div className="col s4">
          <label htmlFor="product-editor-pictures__picture-1">
            {strings.labelPicturesMessage}
            <canvas id="product-editor-pictures__picture-1__canvas" className="cover-modal__canvas"></canvas>
          </label>
          <input type='file' id="product-editor-pictures__picture-1" className="cover-modal__input"
            onChange={ () => loadPicture("product-editor-pictures__picture-1", "product-editor-pictures__picture-1__canvas", defaultPicture) }
          />
        </div>
        <div className="col s8">
        </div>
      </div>

      <div className="row ">
        <div className="col s4">
        </div>
        <div className="col s4">
        </div>
        <div className="col s4">
        </div>
      </div>

      <div className="row ">
        <div className="col s4">
        </div>
        <div className="col s4">
        </div>
        <div className="col s4">
        </div>
      </div>

      {init()}
    </div>
  )
} */

ProductEditorPictures.propTypes = {
  strings: PropTypes.object.isRequired
}

export default ProductEditorPictures
