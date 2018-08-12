import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Strings from '../strings'

import Profile from '../components/profile/profile.js'
import TabsHero from '../components/tabsHero/tabsHero.js'

const Hero = ({ isEditable, cover, logo, name, username, shortdescription, stringsTabs, quantityCart, display, init}) => {
  const coverComp = (<img className="responsive-img" src={cover}/>)

  return (
    <section className="hero__section">
      {coverComp}
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
        init={init}
      />
    </section>
  )
}

Hero.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  cover: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  shortdescription: PropTypes.string.isRequired,
  stringsTabs: PropTypes.object.isRequired,
  quantityCart: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isEditable: state.isEditable,
  cover: state.store.cover,
  logo: state.store.logo,
  name: state.store.name,
  username: state.store.username,
  shortdescription: state.store.shortDescription,
  stringsTabs: Strings(state.language).tabsHero,
  quantityCart: state.cart.quantity,
  display: true
})

const mapDispatchToProps = dispatch => ({
  init: () => {}
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero))