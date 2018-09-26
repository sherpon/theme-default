import React from 'react'
import PropTypes from 'prop-types'

import CoverModal from '../components/coverModal/coverModal'

const CoverContainer = ({isEditable, cover, strings, loadCanvas, loadPicture, coverSaveButton}) => {
  const init = () => {
    /** this load the modals */
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      var instances = M.Modal.init(elems)
    })
  }

  if (isEditable) {
    return(
      <div className="cover-container" style={{ position: 'relative' }}>
        <img className="responsive-img" src={cover}/>
        <div className="cover-container__edit-bar"
          style={{
            padding: '1em',
            position: 'absolute',
            bottom: '5px',
            width: '100%',
            backgroundColor: '#80808045',
            fontWeight: '100'
          }}
        >
          <a className="modal-trigger" href="#cover-modal"
            style={{
              color: 'white'
            }}
          >
            {strings.labelEdit}
          </a>
        </div>
        <CoverModal
          strings={strings.modal}
          cover={cover}
          loadCanvas={loadCanvas}
          loadPicture={loadPicture}
          coverSaveButton={coverSaveButton}
        />
        {init()}
      </div>
    )
  } else {
    return(
      <img className="responsive-img" src={cover}/>
    )
  }
}

CoverContainer.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  cover: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  coverSaveButton: PropTypes.func.isRequired
}

export default CoverContainer
