import React from 'react'
import PropTypes from 'prop-types'
//import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { contactSaveButton } from '../actions/store/contact'
//import Strings from '../strings'

import Contact from '../components/contact'

const ContactContainer = ({
    language,
    isEditable,
    contact,
    contactSaveButton
  }) => {
  const init = () => {
    /** this load the modals */
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      var instances = M.Modal.init(elems)
    })
  }

  if (isEditable) {
    return(
      <div className="contact-container container">
        <Contact.EditButton
          language={language}
        />
        <Contact.View
          contact={contact}
        />
        <Contact.Modal
          language={language}
          contact={contact}
          contactSaveButton={contactSaveButton}
        />
        {init()}
      </div>
    )
  } else {
    return(
      <div className="contact-container container">
        <Contact.View
          contact={contact}
        />
      </div>
    )
  }
}

/*ContactContainer.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  contact: PropTypes.object.isRequired,
  contactSaveButton: PropTypes.func.isRequired
}*/

const mapStateToProps = state => ({
  language: state.language,
  isEditable: state.isEditable,
  contact: state.store.theme.data.contact,
})

const mapDispatchToProps = dispatch => ({
  contactSaveButton: (callback) => dispatch(contactSaveButton(callback))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactContainer)
//export default ContactContainer
