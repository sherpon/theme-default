import React from 'react'
import PropTypes from 'prop-types'
//import { withRouter } from 'react-router-dom'
//import { connect } from 'react-redux'

//import { contactSaveButton } from '../actions/store'
//import Strings from '../strings'

import Contact from '../components/contact'

const ContactContainer = ({
    strings,
    isEditable,
    contact,
    contactSaveButton
  }) => {
  const init = () => {
    /** this load the modals */
    $(document).ready(function(){
      $('.modal').modal()
    })
  }

  if (isEditable) {
    return(
      <div className="contact-container">
        <Contact.Edit
          strings={strings}
          contact={contact}
        />
        <Contact.Modal
          strings={strings.modal}
          contact={contact}
          contactSaveButton={contactSaveButton}
        />
        {init()}
      </div>
    )
  } else {
    return(
      <Contact.View
        strings={strings}
        contact={contact}
      />
    )
  }
}

ContactContainer.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  contact: PropTypes.object.isRequired,
  contactSaveButton: PropTypes.func.isRequired
}

/*const mapStateToProps = state => ({
  strings: Strings(state.language).contactContainer,
  isEditable: state.isEditable,
  contact: state.store.theme.data.contact,
})

const mapDispatchToProps = dispatch => ({
  contactSaveButton: (callback) => dispatch(contactSaveButton(callback))
})*/

/*export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactContainer))*/
export default ContactContainer
