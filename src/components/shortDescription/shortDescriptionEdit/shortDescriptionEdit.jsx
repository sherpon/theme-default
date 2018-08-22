import React from 'react'
import PropTypes from 'prop-types'

const ShortDescriptionEdit = ({strings, shortDescription}) => {
  return(
    <div className="short-description-edit">
      <h1>{shortDescription}</h1>
      <div className="short-description-edit__edit-bar">
        <a className="modal-trigger" href="#short-description-modal">
          {strings.labelEdit}
        </a>
      </div>
    </div>
  )
}

ShortDescriptionEdit.propTypes = {
  strings: PropTypes.object.isRequired,
  shortDescription: PropTypes.string.isRequired
}

export default ShortDescriptionEdit
