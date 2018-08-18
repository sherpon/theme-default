import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Strings from '../strings'

import { noLinkEspace } from '../models/tools'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

const HomeSection = ({ username, section }) => {
  return (
    <Link
      to={`/${username}${noLinkEspace(section.to)}`}
    >
     <img className="sherpon-box sherpon-margin-bottom-5px responsive-img hide-on-small-only" src={`${section.pictureDesktop}`} alt={section.pictureAlt}/>
     <img className="sherpon-box sherpon-margin-bottom-5px responsive-img hide-on-med-and-up" src={`${section.pictureMobil}`} alt={section.pictureAlt}/>
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
    this.state = { hasError: false }
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { strings, isEditable, username, sections } = this.props

    return (
      <section className="home-page">
        {
          sections.map( (section, i) => (
            <HomeSection
              key={i}
              username={username}
              section={section}
            />
          ))
        }
      </section>
    )
  }
}

HomePage.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  sections: PropTypes.array.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  strings: Strings(state.language).homePage,
  username: state.store.username,
  analyticsTrackerId: state.store.analytics,
  facebookPixelId: state.store.facebookPixel,
  isEditable: state.isEditable,
  sections: state.store.theme.sections
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId)
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(HomePage)
