import React from 'react'
import PropTypes from 'prop-types'

const ContactItem = ({id, label, defaultValue}) => (
  <div className="input-field">
    <input id={`contact-modal__${id}__input`} type="text" defaultValue={defaultValue}/>
    <label htmlFor={`contact-modal__${id}__input`}>{label}</label>
  </div>
)

class ContactModal extends React.Component {
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
    $('#contact-modal').modal('close')
  }

  _save() {
    const { contactSaveButton } = this.props
    contactSaveButton( () => {
      $('#contact-modal').modal('close')
    })
  }

  render() {
    const { strings, contact } = this.props
    const cancel = this._cancel
    const save = this._save

    return(
      <div
        id="contact-modal"
        className="modal modal-fixed-footer contact-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>
          <ContactItem
            id={'facebook'}
            label={strings.labelFacebook}
            defaultValue={contact.facebook}
          />
          <ContactItem
            id={'instagram'}
            label={strings.labelInstagram}
            defaultValue={contact.instagram}
          />
          <ContactItem
            id={'whatsapp'}
            label={strings.labelWhatsapp}
            defaultValue={contact.whatsapp}
          />
          <ContactItem
            id={'phone'}
            label={strings.labelPhone}
            defaultValue={contact.phone}
          />
          <ContactItem
            id={'email'}
            label={strings.labelEmail}
            defaultValue={contact.email}
          />
          <ContactItem
            id={'address'}
            label={strings.labelAddress}
            defaultValue={contact.address}
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

ContactModal.propTypes = {
  strings: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  contactSaveButton: PropTypes.func.isRequired
}

export default ContactModal
