import React from 'react'
import PropTypes from 'prop-types'

const ContactItem = ({icon, data}) => {
  if (data==='') {
    return(<div/>)
  } else {
    return(
      <div className="col s12 m6">
        <div className="col s2">
          <img src={`/images/store/${icon}`} className="contact-icon"/>
        </div>
        <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
          {data}
        </div>
      </div>
    )
  }
}


const Contact = ({strings, contact }) => {
  return (
    <address className="">
      <div className="sherpon-contact sherpon-box sherpon-color-text-body-secundary">
        <div className="sherpon-row">

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

Contact.propTypes = {
  strings: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired
}

export default Contact
