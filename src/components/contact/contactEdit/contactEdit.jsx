import React from 'react'
import PropTypes from 'prop-types'

import ContactView from '../contactView/contactView.jsx'

const ContactEdit = ({strings, contact}) => {
  return (
    <div className="contact-edit">
      <div className="contact-edit__edit-bar">
        <a className="modal-trigger" href="#contact-modal">
          {strings.labelEdit}
        </a>
      </div>
      <ContactView
        strings={strings}
        contact={contact}
      />
    </div>
  )
}

ContactEdit.propTypes = {
  strings: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired
}

export default ContactEdit
