import React from 'react'
import PropTypes from 'prop-types'
//import defaultPicture from '../../../../images/store/placeholderSectionPicture.png'
import defaultPicture from '../img/placeholderSectionPicture.png'

class ProductEditorPictures extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { loadCanvas } = this.props
    //const defaultPicture = '/images/store/placeholderSectionPicture.png'
    loadCanvas('product-editor-pictures__picture-1__canvas', defaultPicture)
    loadCanvas('product-editor-pictures__picture-2__canvas', defaultPicture)
    loadCanvas('product-editor-pictures__picture-3__canvas', defaultPicture)
    loadCanvas('product-editor-pictures__picture-4__canvas', defaultPicture)
    loadCanvas('product-editor-pictures__picture-5__canvas', defaultPicture)
    loadCanvas('product-editor-pictures__picture-6__canvas', defaultPicture)
    loadCanvas('product-editor-pictures__picture-7__canvas', defaultPicture)
  }

  render() {
    const { strings, loadPicture } = this.props
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
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-1">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-1__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-1" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-1", "product-editor-pictures__picture-1__canvas", defaultPicture) }
            />
          </div>
          <div className="col s8">
          </div>
        </div>

        <div className="row ">
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-2">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-2__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-2" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-2", "product-editor-pictures__picture-2__canvas", defaultPicture) }
            />
          </div>
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-3">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-3__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-3" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-3", "product-editor-pictures__picture-3__canvas", defaultPicture) }
            />
          </div>
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-4">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-4__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-4" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-4", "product-editor-pictures__picture-4__canvas", defaultPicture) }
            />
          </div>
        </div>

        <div className="row ">
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-5">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-5__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-5" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-5", "product-editor-pictures__picture-5__canvas", defaultPicture) }
            />
          </div>
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-6">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-6__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-6" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-6", "product-editor-pictures__picture-6__canvas", defaultPicture) }
            />
          </div>
          <div className="col s4">
            <label htmlFor="product-editor-pictures__picture-7">
              {strings.labelPicturesMessage}
              <canvas id="product-editor-pictures__picture-7__canvas" className="product-editor-pictures__canvas"></canvas>
            </label>
            <input type='file' id="product-editor-pictures__picture-7" className="product-editor-pictures__input"
              onChange={ () => loadPicture("product-editor-pictures__picture-7", "product-editor-pictures__picture-7__canvas", defaultPicture) }
            />
          </div>
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
