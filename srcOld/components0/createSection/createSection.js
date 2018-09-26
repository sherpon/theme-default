import React from 'react'
import PropTypes from 'prop-types'

import HomeSectionModal from '../homeSectionModal/homeSectionModal'

const CreateSection = ({strings, loadCanvas, loadPicture, categories, homeSectionModalPublishButton}) => {

  return(
    <div className="create-section">

      <a className="modal-trigger" href="#sectionModal">
        {strings.title}
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
