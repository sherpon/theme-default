import React from 'react'
import PropTypes from 'prop-types'

class ShortDescriptionModal extends React.Component {
  constructor(props) {
    super(props)
    this._cancel = this._cancel.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount() {
    const { shortDescription } = this.props
    //$('#short-description-modal').val(shortDescription)
    //M.textareaAutoResize($('#short-description-modal'))
  }

  _cancel() {
    $('#short-description-modal').modal('close')
  }

  _save() {
    const { shortDescriptionSaveButton } = this.props
    shortDescriptionSaveButton( () => {
      $('#short-description-modal').modal('close')
    })
  }

  render() {
    const { strings, shortDescription } = this.props
    const cancel = this._cancel
    const save = this._save
    const init = () => {
      //$('#short-description-modal__textarea').val(shortDescription)
      //M.textareaAutoResize($('#short-description-modal'))
      setTimeout( () => {
        $('#short-description-modal__textarea').val(shortDescription)
        M.updateTextFields()
        M.textareaAutoResize($('#short-description-modal__textarea'))
      },1000 )
    }

    return(
      <div
        id="short-description-modal"
        className="modal short-description-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>
          <div className="input-field">
            <textarea id="short-description-modal__textarea" className="materialize-textarea"></textarea>
            <label htmlFor="short-description-modal__textarea">{strings.label}</label>
          </div>
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
        {
          init()
        }
      </div>
    )
  }
}

ShortDescriptionModal.propTypes = {
  strings: PropTypes.object.isRequired,
  shortDescription: PropTypes.string.isRequired,
  shortDescriptionSaveButton: PropTypes.func.isRequired
}

export default ShortDescriptionModal
