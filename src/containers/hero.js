import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { coverSaveButton } from '../actions/store'
import Strings from '../strings'
import { loadCanvas, loadPicture } from '../models/canvas'

import CoverContainer from './coverContainer'
import Profile from '../components/profile/profile.js'
import TabsHero from '../components/tabsHero/tabsHero.js'

const Hero = ({ isEditable, cover, stringsCover, logo, name, username, shortdescription, stringsTabs, quantityCart, display, coverSaveButton}) => {

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
        logo={logo}
        name={name}
        shortdescription={shortdescription}
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
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  shortdescription: PropTypes.string.isRequired,
  stringsTabs: PropTypes.object.isRequired,
  quantityCart: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
  coverSaveButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isEditable: state.isEditable,
  cover: state.store.theme.data.cover,
  stringsCover: Strings(state.language).coverContainer,
  logo: state.store.logo,
  name: state.store.name,
  username: state.store.username,
  shortdescription: state.store.shortDescription,
  stringsTabs: Strings(state.language).tabsHero,
  quantityCart: state.cart.quantity,
  display: true
})

const mapDispatchToProps = dispatch => ({
  coverSaveButton: (callback) => dispatch(coverSaveButton(callback))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero))
