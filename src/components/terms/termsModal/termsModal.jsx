import React from 'react'
import PropTypes from 'prop-types'

class TermsModal extends React.Component {
  constructor(props) {
    super(props)
    this._cancel = this._cancel.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount() {
    //const { shortDescription } = this.props
    //$('#terms-modal').val(shortDescription)
    //M.textareaAutoResize($('#terms-modal'))
  }

  _cancel() {
    $('#terms-modal').modal('close')
  }

  _save() {
    const { termsSaveButton } = this.props
    termsSaveButton( () => {
      $('#terms-modal').modal('close')
    })
  }

  render() {
    const { strings, terms } = this.props
    const cancel = this._cancel
    const save = this._save
    const init = () => {
      //$('#terms-modal__textarea').val(shortDescription)
      //M.textareaAutoResize($('#terms-modal'))
      setTimeout( () => {
        $('#terms-modal__exchange').val(terms.exchange)
        $('#terms-modal__refund').val(terms.refund)
        M.updateTextFields()
        M.textareaAutoResize($('#terms-modal__exchange'))
        M.textareaAutoResize($('#terms-modal__refund'))
      },100 )
    }

    return(
      <div
        id="terms-modal"
        className="modal terms-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>
          <div className="input-field">
            <textarea id="terms-modal__exchange" className="materialize-textarea"></textarea>
            <label htmlFor="terms-modal__exchange">{strings.labelExchange}</label>
          </div>
          <div className="input-field">
            <textarea id="terms-modal__refund" className="materialize-textarea"></textarea>
            <label htmlFor="terms-modal__refund">{strings.labelRefund}</label>
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

TermsModal.propTypes = {
  strings: PropTypes.object.isRequired,
  terms: PropTypes.object.isRequired,
  termsSaveButton: PropTypes.func.isRequired
}

export default TermsModal
