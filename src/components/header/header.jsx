import React from 'react'
import { connect } from 'react-redux'

import style from './header.scss'

import LogoContainer from '../../containers/logoContainer.jsx'
import ShortDescriptionContainer from '../../containers/shortDescriptionContainer.jsx'

const Header = ({ name }) => {

  return (
    <div className="header container">
      <div className="row">

        <div className="col s3 m1 l1 xl1">
          <LogoContainer/>
        </div>

        <div className="col s9 m11 l11 xl11">
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
