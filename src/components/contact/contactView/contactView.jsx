import React from 'react'
import PropTypes from 'prop-types'

import style from './contactView.scss'

const ContactItem = ({icon, data}) => {
  if (data==='') {
    return(<div/>)
  } else {
    return(
      <div className="col s12 m6">
        <div className="col s2">
          <img src={require(`../../../images/store/${icon}`)} className="contact-icon"/>
        </div>
        <div className="col s9 label">
          {data}
        </div>
      </div>
    )
  }
}


const ContactView = ({ contact }) => {
  return (
    <address className="">
      <div className="contact-view">
        <div className="row">

          <ContactItem
            icon={'icons8-facebook-64.png'}
            data={contact.facebook}
          />
          <ContactItem
            icon={'icons8-instagram-64.png'}
            data={contact.instagram}
          />
          <ContactItem
            icon={'icons8-whatsapp-64.png'}
            data={contact.whatsapp}
          />
          <ContactItem
            icon={'icons8-phone-64.png'}
            data={contact.phone}
          />
          <ContactItem
            icon={'icons8-email-64.png'}
            data={contact.email}
          />
          <ContactItem
            icon={'icons8-map-64.png'}
            data={contact.address}
          />

        </div>
      </div>
    </address>
  )
}

ContactView.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactView
