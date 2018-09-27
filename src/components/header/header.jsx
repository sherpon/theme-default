import React from 'react'
import { connect } from 'react-redux'

import style from './header.scss'

import LogoContainer from '../../containers/logoContainer.jsx'
import ShortDescriptionContainer from '../../containers/shortDescriptionContainer.jsx'

const Header = ({ name }) => {

  return (
    <div className="header container">
      <div className="row">

        <div className="col s4 m2 l2">
          <LogoContainer/>
        </div>

        <div className="col s8 m10 l10">
          <h1>{name}</h1>
          <ShortDescriptionContainer/>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  name: state.store.name
})

export default connect(
  mapStateToProps,
  {}
)(Header)
