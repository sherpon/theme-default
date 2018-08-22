import React from 'react'
import PropTypes from 'prop-types'

class LogoModal extends React.Component {
  constructor(props) {
    super(props)
    this._cancel = this._cancel.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount() {
    const { loadCanvas, logo } = this.props
    loadCanvas('logo-modal__canvas', logo)
  }

  _cancel() {
    $('#logo-modal').modal('close')
  }

  _save() {
    const { logoSaveButton } = this.props
    logoSaveButton( () => {
      $('#logo-modal').modal('close')
    })
  }

  render() {
    const { strings, logo, loadPicture } = this.props
    const cancel = this._cancel
    const save = this._save

    return(
      <div
        id="logo-modal"
        className="modal logo-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>
            <label htmlFor="logo-modal__input">
              {strings.label}
              <canvas id="logo-modal__canvas" className="logo-modal__canvas"></canvas>
            </label>
            <input type='file' id="logo-modal__input" className="logo-modal__input"
              onChange={ () => loadPicture("logo-modal__input", "logo-modal__canvas", logo) }
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

LogoModal.propTypes = {
  strings: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  logoSaveButton: PropTypes.func.isRequired
}

export default LogoModal
