import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Strings from '../strings'

import {
  homeSectionModalPublishButton,
  homeSectionDeleteButton
} from '../actions/store'
import { loadCanvas, loadPicture } from '../models/canvas'
import { noLinkEspace } from '../models/tools'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import CreateSection from '../components/createSection/createSection'
//import HomeSectionModal from '../components/homeSectionModal/homeSectionModal'

import HomeSectionContainer from './homeSectionContainer.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    this.init = this.init.bind(this)
  }

  init() {
    /** this load the modals */
    $(document).ready(function(){
      $('.modal').modal()
      $('select').formSelect()
    })
  }

  render() {
    const {
      strings,
      stringsCreateSection,
      isEditable,
      username,
      categories,
      sections,
      homeSectionModalPublishButton,
      homeSectionDeleteButton
    } = this.props

    const init = this.init
    let createSectionButton

    if (isEditable) {
      // show create section button
      createSectionButton = (
        <CreateSection
          strings={stringsCreateSection}
          loadCanvas={loadCanvas}
          loadPicture={loadPicture}
          categories={categories}
          homeSectionModalPublishButton={homeSectionModalPublishButton}
        />
      )
    } else {
      // hide create section button
      createSectionButton = (<div/>)
    }

    return (
      <section className="home-page">
        {createSectionButton}
        {
          sections.map( (section, i) => (
            <HomeSectionContainer
              key={i}
              isEditable={isEditable}
              strings={strings}
              index={i}
              username={username}
              section={section}
              noLinkEspace={noLinkEspace}
              homeSectionDeleteButton={homeSectionDeleteButton}
            />
          ))
        }
        {init()}
      </section>
    )
  }
}

HomePage.propTypes = {
  strings: PropTypes.object.isRequired,
  stringsCreateSection: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  sections: PropTypes.array.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  homeSectionModalPublishButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  strings: Strings(state.language).homePage,
  stringsCreateSection: Strings(state.language).components.homeSectionModal,
  username: state.store.username,
  categories: state.store.categories,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  isEditable: state.isEditable,
  sections: state.store.theme.data.sections
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  homeSectionModalPublishButton: (sectionModalId, callback) => dispatch(homeSectionModalPublishButton(sectionModalId, callback)),
  homeSectionDeleteButton: (homeSectionIndex) => dispatch(homeSectionDeleteButton(homeSectionIndex))
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(HomePage)
