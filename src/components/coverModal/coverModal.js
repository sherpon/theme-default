import React from 'react'
import PropTypes from 'prop-types'

class CoverModal extends React.Component {
  constructor(props) {
    super(props)
    this._cancel = this._cancel.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount() {
    const { loadCanvas, cover } = this.props
    loadCanvas('cover-modal__canvas', cover)
  }

  _cancel() {
    $('#cover-modal').modal('close')
  }

  _save() {
    const { coverSaveButton } = this.props
    coverSaveButton( () => {
      $('#cover-modal').modal('close')
    })
  }

  render() {
    const { strings, cover, loadPicture } = this.props
    const cancel = this._cancel
    const save = this._save

    return(
      <div
        id="cover-modal"
        className="modal cover-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>
            <label htmlFor="cover-modal__input">
              <canvas id="cover-modal__canvas" className="cover-modal__canvas"></canvas>
            </label>
            <input type='file' id="cover-modal__input" className="cover-modal__input"
              onChange={ () => loadPicture("cover-modal__input", "cover-modal__canvas", cover) }
            />
        </div>

        <div className="modal-footer">
          <a className="waves-effect btn-flat"
            onClick={ () => cancel() }
          >
            {strings.buttonCancel}
          </a>
          <a className="waves-effect waves-light btn-small z-depth-0"
            onClick={ () => save() }
          >
            {strings.buttonSave}
          </a>
        </div>
      </div>
    )
  }
}

CoverModal.propTypes = {
  strings: PropTypes.object.isRequired,
  cover: PropTypes.string.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  coverSaveButton: PropTypes.func.isRequired
}

export default CoverModal
