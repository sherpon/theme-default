import React from 'react'
import PropTypes from 'prop-types'

const CategoriesCreator = ({
    strings
  }) => {
  return(
    <div className="categories-creator">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <a className="modal-trigger" href="#categories-modal">
          <div className="categories-creator__button">
            <div className="col s3">
              <img className="categories-creator__icon" src="/images/store/icons8-add-64.png" />
            </div>
            <div className="col s9">
              <div className="categories-creator__title">
                {strings.titleCreator}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

CategoriesCreator.propTypes = {
  strings: PropTypes.object.isRequired
}

export default CategoriesCreator
