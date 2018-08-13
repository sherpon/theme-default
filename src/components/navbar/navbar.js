import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ strings, search, inSession, user, username, logout }) => {
  let navItemsComp, sidenavComp

  if ( inSession ) {
    navItemsComp = (
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down">
        <li className="truncate"><a className="dropdown-trigger" href="#!" data-target="dropdown1">
          {`${strings.navbarItemGreeting}${user.name}`}
          <i className="material-icons right">arrow_drop_down</i>
        </a></li>
      </ul>
    )

    sidenavComp = (
      <ul className="sidenav" id="mobile-demo">
        <li className="sidenav__user-name">{`${strings.navbarItemGreeting}${user.name}`}</li>
        <li><Link to={`/${username}/account`}>{strings.navbarItemAccount}</Link></li>
        <li><Link to={`/${username}/purchases`}>{strings.navbarItemPurchases}</Link></li>
        <li className="divider"></li>
        <li><a onClick={ () => logout() }>{strings.navbarItemLogout}</a></li>
      </ul>
    )
  } else {
    navItemsComp = (
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down">
        <li><Link to={`/${username}/login`}>{strings.navbarItemLogin}</Link></li>
      </ul>
    )

    sidenavComp = (
      <ul className="sidenav" id="mobile-demo">
        <li><Link to={`/${username}/login`}>{strings.navbarItemLogin}</Link></li>
      </ul>
    )
  }

  // Items de menu account dropdown
  const dropdownComp = (
    <ul id="dropdown1" className="dropdown-content">
      <li><Link to={`/${username}/account`}>{strings.navbarItemAccount}</Link></li>
      <li><Link to={`/${username}/purchases`}>{strings.navbarItemPurchases}</Link></li>
      <li className="divider"></li>
      <li><a onClick={ () => logout() }>{strings.navbarItemLogout}</a></li>
    </ul>
  )

  const init = () => {
    $(document).ready(function(){
      $('.sidenav').sidenav()
      $(".dropdown-trigger").dropdown()
    })
  }

  return (
    <header>
      <nav className="nav-extended sherpon-position-relative">
        <div className="nav-wrapper container row sherpon-margin-bottom-0px">

          <div className="col s10 m10 l8">
            <div className="sherpon-search">
              <input
                id="search-input"
                type="text"
                className="sherpon-search-input"
                placeholder={strings.searchInputPlaceholder}
                onKeyPress={ (e) => search(e) }/>
            </div>
          </div>

          <div className="col s2 m2 l4">
            <a
              href="#"
              data-target="mobile-demo"
              className="sidenav-trigger right sherpon-sidenav">
              <i
                className="material-icons">
                {strings.iconMenu}
              </i>
            </a>

            {dropdownComp}
            {navItemsComp}
          </div>

        </div>
      </nav>

      {sidenavComp}
      { init() }
    </header>
  )
}

Navbar.propTypes = {
  strings:PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  inSession: PropTypes.bool.isRequired,
  user: PropTypes.any,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default Navbar
