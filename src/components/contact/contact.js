import React from 'react'
import PropTypes from 'prop-types'

const Contact = ({strings, isEditable, contact }) => {
  return (
    <address className="">
      <div className="sherpon-contact sherpon-box sherpon-color-text-body-secundary">
        <div className="sherpon-row">

          <div className="col s12 m6">
            <div className="col s2">
              <img src="/images/store/icons8-facebook-64.png" className="contact-icon"/>
            </div>
            <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
              {contact.facebook}
            </div>
          </div>

          <div className="col s12 m6">
            <div className="col s2">
              <img src="/images/store/icons8-instagram-64.png" className="contact-icon"/>
            </div>
            <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
              {contact.instagram}
            </div>
          </div>

          <div className="col s12 m6">
            <div className="col s2">
              <img src="/images/store/icons8-whatsapp-64.png" className="contact-icon"/>
            </div>
            <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
              {contact.whatsapp}
            </div>
          </div>

          <div className="col s12 m6">
            <div className="col s2">
              <img src="/images/store/icons8-phone-64.png" className="contact-icon"/>
            </div>
            <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
              {contact.phone}
            </div>
          </div>

          <div className="col s12 m6">
            <div className="col s2">
              <img src="/images/store/icons8-email-64.png" className="contact-icon"/>
            </div>
            <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
              {contact.email}
            </div>
          </div>

          <div className="col s12 m6">
            <div className="col s2">
              <img src="/images/store/icons8-map-64.png" className="contact-icon"/>
            </div>
            <div className="col s9 sherpon-font-style-normal sherpon-padding-left-0px">
              {contact.address}
            </div>
          </div>

        </div>
      </div>
    </address>
  )
}

Contact.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  contact: PropTypes.object.isRequired
}

export default Contact
