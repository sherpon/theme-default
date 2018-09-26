import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  coverSaveButton,
  logoSaveButton,
  shortDescriptionSaveButton
} from '../actions/store'
import Strings from '../strings'
import { loadCanvas, loadPicture } from '../models/canvas'

import CoverContainer from './coverContainer'
import Profile from '../components/profile/profile.js'
import TabsHero from '../components/tabsHero/tabsHero.js'

const Hero = ({
  isEditable,
  cover,
  stringsCover,
  logo,
  stringsLogo,
  name,
  username,
  shortDescription,
  stringsShortDescription,
  stringsTabs,
  quantityCart,
  display,
  coverSaveButton,
  logoSaveButton,
  shortDescriptionSaveButton
}) => {

  return (
    <section className="hero__section">
      <CoverContainer
        isEditable={isEditable}
        cover={cover}
        strings={stringsCover}
        loadCanvas={loadCanvas}
        loadPicture={loadPicture}
        coverSaveButton={coverSaveButton}
      />
      <Profile
        isEditable={isEditable}
        logo={logo}
        stringsLogo={stringsLogo}
        loadCanvas={loadCanvas}
        loadPicture={loadPicture}
        logoSaveButton={logoSaveButton}
        name={name}
        shortDescription={shortDescription}
        stringsShortDescription={stringsShortDescription}
        shortDescriptionSaveButton ={shortDescriptionSaveButton}
      />
      <TabsHero
        strings={stringsTabs}
        username={username}
        quantityCart={quantityCart}
        display={display}
      />
    </section>
  )
}

Hero.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  cover: PropTypes.string.isRequired,
  stringsCover: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
  stringsLogo: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  stringsShortDescription: PropTypes.object.isRequired,
  stringsTabs: PropTypes.object.isRequired,
  quantityCart: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
  coverSaveButton: PropTypes.func.isRequired,
  logoSaveButton: PropTypes.func.isRequired,
  shortDescriptionSaveButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isEditable: state.isEditable,
  cover: ( state.store.theme.data.cover !== '' ) ? ( state.store.theme.data.cover ) : ( '../images/store/placeholderCover.png' ),
  stringsCover: Strings(state.language).coverContainer,
  logo: ( state.store.theme.data.logo !== '' ) ? ( state.store.theme.data.logo ) : ( '../images/store/placeholderLogo.png' ),
  stringsLogo: Strings(state.language).logoContainer,
  name: state.store.name,
  username: state.store.username,
  shortDescription: state.store.theme.data.shortDescription,
  stringsShortDescription: Strings(state.language).shortDescriptionContainer,
  stringsTabs: Strings(state.language).tabsHero,
  quantityCart: state.cart.quantity,
  display: true
})

const mapDispatchToProps = dispatch => ({
  coverSaveButton: (callback) => dispatch(coverSaveButton(callback)),
  logoSaveButton: (callback) => dispatch(logoSaveButton(callback)),
  shortDescriptionSaveButton: (callback) => dispatch(shortDescriptionSaveButton(callback))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero))
