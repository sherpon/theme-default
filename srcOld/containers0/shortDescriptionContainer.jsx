import React from 'react'
import PropTypes from 'prop-types'

import ShortDescription from '../components/shortDescription'

const ShortDescriptionContainer = ({isEditable, shortDescription, strings, shortDescriptionSaveButton}) => {
  const init = () => {
    /** this load the modals */
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      var instances = M.Modal.init(elems)
    })
  }

  if (isEditable) {
    return(
      <div className="short-description-container">
        <ShortDescription.Edit
          strings={strings}
          shortDescription={shortDescription}
        />
        <ShortDescription.Modal
          strings={strings.modal}
          shortDescription={shortDescription}
          shortDescriptionSaveButton={shortDescriptionSaveButton}
        />
        {init()}
      </div>
    )
  } else {
    return(
      <h1>{shortDescription}</h1>
    )
  }
}

ShortDescriptionContainer.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  shortDescription: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
  shortDescriptionSaveButton: PropTypes.func.isRequired
}

export default ShortDescriptionContainer
