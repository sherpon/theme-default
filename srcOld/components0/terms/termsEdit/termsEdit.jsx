import React from 'react'
import PropTypes from 'prop-types'

import TermsView from '../termsView/termsView.jsx'

const TermsEdit = ({strings, terms}) => {
  return (
    <div className="terms-edit">
      <div className="terms-edit__edit-bar">
        <a className="modal-trigger" href="#terms-modal">
          {strings.labelEdit}
        </a>
      </div>
      <TermsView
        strings={strings}
        terms={terms}
      />
    </div>
  )
}

TermsEdit.propTypes = {
  strings: PropTypes.object.isRequired,
  terms: PropTypes.object.isRequired
}

export default TermsEdit
