import React from 'react'
import PropTypes from 'prop-types'

const CategoriesCreator = ({
    strings
  }) => {
  return(
    <div className="categories-creator">
        <a className="modal-trigger" href="#categories-modal">
          {strings.titleCreator}
        </a>
    </div>
  )
}

CategoriesCreator.propTypes = {
  strings: PropTypes.object.isRequired
}

export default CategoriesCreator
