import React from 'react'
import PropTypes from 'prop-types'

const Profile = ({ logo, name, shortdescription }) => {
  return (
    <div className="sherpon-store-profile">
      <div className="sherpon-row">

        <div className="col s4 m2 l2">
          <img className="responsive-img" src={logo}/>
        </div>

        <div className="col s8 m10 l10">
          <h5>{name}</h5>
          <h1>{shortdescription}</h1>
        </div>

      </div>
    </div>
  )
}

Profile.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortdescription: PropTypes.string.isRequired
}

export default Profile