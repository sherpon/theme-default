import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/** actions */
import { shortDescriptionSaveButton } from '../actions/store/theme'

/** components */
import ShortDescription from '../components/shortDescription'

const ShortDescriptionContainer = ({ language, isEditable, shortDescription, shortDescriptionSaveButton }) => {
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
          language={language}
          shortDescription={shortDescription}
        />
        <ShortDescription.Modal
          language={language}
          shortDescription={shortDescription}
          shortDescriptionSaveButton={shortDescriptionSaveButton}
        />
        {init()}
      </div>
    )
  } else {
    return(
      <h6>{shortDescription}</h6>
    )
  }
}

ShortDescriptionContainer.propTypes = {
  language: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  shortDescription: PropTypes.string.isRequired,
  shortDescriptionSaveButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  language: state.language,
  isEditable: state.isEditable,
  shortDescription: state.store.theme.data.shortDescription
})

const mapDispatchToProps = dispatch => ({
  shortDescriptionSaveButton: (callback) => dispatch(shortDescriptionSaveButton(callback))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortDescriptionContainer)
