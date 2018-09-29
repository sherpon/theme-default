import React from 'react'
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import placeholderSectionPicture from '../images/store/placeholderSectionPicture.png'

/** actions */
import {
  homeSectionModalPublishButton,
  homeSectionDeleteButton
} from '../actions/store/theme'

/** models */
import { loadCanvas, loadPicture } from '../models/canvas'
import { noLinkEspace } from '../models/tools'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

/** components */
import HomeSection from '../components/homeSection'
//import CreateSection from '../components/createSection/createSection'
//import HomeSectionModal from '../components/homeSectionModal/homeSectionModal'

/** containers */
import HomeSectionContainer from '../containers/homeSectionContainer.jsx'

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
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal')
      var instances = M.Modal.init(elems)
      var elems = document.querySelectorAll('select')
      var instances = M.FormSelect.init(elems)
    })
  }

  render() {
    const {
      language,
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
    let homeSectionModal

    if (isEditable) {
      // show create section button
      createSectionButton = (
        <HomeSection.CreateButton
          language={language}
        />
      )
      homeSectionModal = (
        <HomeSection.Modal
          id={'sectionModal'}
          language={language}
          loadCanvas={loadCanvas}
          loadPicture={loadPicture}
          defaultPicture={placeholderSectionPicture}
          categories={categories}
          homeSectionModalPublishButton={homeSectionModalPublishButton}
        />
      )
    } else {
      // hide create section button
      createSectionButton = (<div/>)
      homeSectionModal = (<div/>)
    }

    return (
      <section className="home-page">
        {createSectionButton}
        {homeSectionModal}
        {
          sections.map( (section, i) => (
            <HomeSectionContainer
              key={i}
              isEditable={isEditable}
              language={language}
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

const mapStateToProps = state => ({
  language: state.language,
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
