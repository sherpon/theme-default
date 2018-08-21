import React from 'react'
import PropTypes from 'prop-types'

import HomeSectionModal from '../homeSectionModal/homeSectionModal'

const CreateSection = ({strings, loadCanvas, loadPicture, categories, homeSectionModalPublishButton}) => {

  return(
    <div className="create-section">

      <a className="modal-trigger" href="#sectionModal">
        <div className="create-section__button">
          <div className="col s3 m2">
            <img className="create-section__icon" src="/images/store/icons8-add-64.png" />
          </div>
          <div className="col s9 m10">
            <div className="create-section__title">
              {strings.title}
            </div>
          </div>
        </div>
      </a>

      <HomeSectionModal
        id={'sectionModal'}
        strings={strings}
        loadCanvas={loadCanvas}
        loadPicture={loadPicture}
        defaultPicture={'/images/store/placeholderSectionPicture.png'}
        categories={categories}
        homeSectionModalPublishButton={homeSectionModalPublishButton}
      />
    </div>
  )
}

CreateSection.propTypes = {
  strings: PropTypes.object.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  homeSectionModalPublishButton: PropTypes.func.isRequired
}

export default CreateSection
