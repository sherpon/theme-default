import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Strings from '../strings'

import { homeSectionModalPublishButton } from '../actions/store'
import { loadCanvas, loadPicture } from '../models/canvas'
import { noLinkEspace } from '../models/tools'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import CreateSection from '../components/createSection/createSection'
//import HomeSectionModal from '../components/homeSectionModal/homeSectionModal'

const HomeSection = ({ username, section }) => {
  return (
    <Link
      to={`/${username}${noLinkEspace(section.to)}`}
    >
     <img className="sherpon-box sherpon-margin-bottom-5px responsive-img hide-on-small-only" src={`${section.pictureDesktop}`} alt={section.pictureAlt}/>
     <img className="sherpon-box sherpon-margin-bottom-5px responsive-img hide-on-med-and-up" src={`${section.pictureMobile}`} alt={section.pictureAlt}/>
    </Link>
  )
}

HomeSection.propTypes = {
  username: PropTypes.string.isRequired,
  section: PropTypes.object.isRequired
}

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
    const { strings, stringsCreateSection, isEditable, username, categories, sections, homeSectionModalPublishButton } = this.props
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
            <HomeSection
              key={i}
              username={username}
              section={section}
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
  analyticsTrackerId: state.store.analytics,
  facebookPixelId: state.store.facebookPixel,
  isEditable: state.isEditable,
  sections: state.store.theme.data.sections
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  homeSectionModalPublishButton: (sectionModalId, callback) => dispatch(homeSectionModalPublishButton(sectionModalId, callback))
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(HomePage)
