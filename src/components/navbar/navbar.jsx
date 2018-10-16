import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './navbar.scss'

const strings = {
  ES:require('./strings/navbar.ES.json'),
  EN:require('./strings/navbar.EN.json')
}

const Navbar = ({ language, search, inSession, isAdmin, isEditable, editStoreSwitch, user, username, logout }) => {
  let navItemsComp, sidenavComp, dropdownComp

  if ( inSession ) {
    navItemsComp = (
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down">
        <li className="truncate"><a className="dropdown-trigger" href="#!" data-target="dropdown1">
          {`${strings[language].navbarItemGreeting}${user.name}`}
          <i className="material-icons right">arrow_drop_down</i>
        </a></li>
      </ul>
    )

    if ( isAdmin ) {
      let labelEdit
      if (isEditable) { // if is editable, so turn it down
        labelEdit = strings[language].navbarItemEditCompleted
      } else {  // if isn't at editable mode, so turn it up
        labelEdit = strings[language].navbarItemEdit
      }

      const menuListComp = [
        <li key={1}><a className="sidenav-close" onClick={ () => editStoreSwitch() }>{labelEdit}</a></li>,
        //<li key={2}><Link to={`/${username}/account`}>{strings[language].navbarItemCategories}</Link></li>,
        <li key={3}><Link className="sidenav-close" to={`/${username}/products`}>{strings[language].navbarItemProducts}</Link></li>,
        <li key={4}><Link className="sidenav-close" to={`/${username}/sales`}>{strings[language].navbarItemSales}</Link></li>,
        <li key={5}><Link className="sidenav-close" to={`/${username}/paymentgateway`}>{strings[language].navbarItemPayment}</Link></li>,
        <li key={6}><Link className="sidenav-close" to={`/${username}/marketing`}>{strings[language].navbarItemMarketing}</Link></li>,
        <li key={7}><Link className="sidenav-close" to={`/${username}/shipping`}>{strings[language].navbarItemShipping}</Link></li>,
        //<li key={7} className="divider"></li>,
        //<li key={8}><Link to={`/${username}/account`}>{strings[language].navbarItemSupportMe}</Link></li>,
        <li key={9} className="divider"></li>,
        <li key={10}><Link className="sidenav-close" to={`/${username}/account`}>{strings[language].navbarItemAccount}</Link></li>,
        <li key={11}><Link className="sidenav-close" to={`/${username}/purchases`}>{strings[language].navbarItemPurchases}</Link></li>,
        <li key={12} className="divider"></li>,
        <li key={13}><a className="sidenav-close" onClick={ () => logout() }>{strings[language].navbarItemLogout}</a></li>
      ]

      // Items de menu account dropdown
      dropdownComp = (
        <ul id="dropdown1" className="dropdown-content">
          { menuListComp.map( (item) => (item) ) }
        </ul>
      )

      sidenavComp = (
        <ul className="sidenav" id="mobile-demo">
          <li className="sidenav__user-name">{`${strings[language].navbarItemGreeting}${user.name}`}</li>
          <li className="divider"></li>
          { menuListComp.map( (item) => (item) ) }
        </ul>
      )
    } else {
      // Items de menu account dropdown
      dropdownComp = (
        <ul id="dropdown1" className="dropdown-content">
          <li><Link className="sidenav-close" to={`/${username}/account`}>{strings[language].navbarItemAccount}</Link></li>
          <li><Link className="sidenav-close" to={`/${username}/purchases`}>{strings[language].navbarItemPurchases}</Link></li>
          <li className="divider"></li>
          <li><a className="sidenav-close" onClick={ () => logout() }>{strings[language].navbarItemLogout}</a></li>
        </ul>
      )

      sidenavComp = (
        <ul className="sidenav" id="mobile-demo">
          <li className="sidenav__user-name">{`${strings[language].navbarItemGreeting}${user.name}`}</li>
          <li><Link className="sidenav-close" to={`/${username}/account`}>{strings[language].navbarItemAccount}</Link></li>
          <li><Link className="sidenav-close" to={`/${username}/purchases`}>{strings[language].navbarItemPurchases}</Link></li>
          <li className="divider"></li>
          <li><a className="sidenav-close" onClick={ () => logout() }>{strings[language].navbarItemLogout}</a></li>
        </ul>
      )
    }

  } else {
    navItemsComp = (
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down">
        <li><Link className="sidenav-close" to={`/${username}/login`}>{strings[language].navbarItemLogin}</Link></li>
      </ul>
    )

    // Items de menu account dropdown
    dropdownComp = (<ul id="dropdown1" className="dropdown-content"/>)

    sidenavComp = (
      <ul className="sidenav" id="mobile-demo">
        <li><Link className="sidenav-close" to={`/${username}/login`}>{strings[language].navbarItemLogin}</Link></li>
      </ul>
    )
  }



  const init = () => {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav')
      var instances = M.Sidenav.init(elems)
      var elems = document.querySelectorAll('.dropdown-trigger')
      var instances = M.Dropdown.init(elems)
    })
  }

  return (
    <header>
      <nav className="nav-extended">
        <div className="nav-wrapper container row">

          <div className="col s10 m10 l8">
            {/*
              <div className="sherpon-search">
                <input
                  id="search-input"
                  type="text"
                  className="sherpon-search-input"
                  placeholder={strings[language].searchInputPlaceholder}
                  onKeyPress={ (e) => search(e) }/>
              </div>
            */}
          </div>

          <div className="col s2 m2 l4">
            <a
              href="#"
              data-target="mobile-demo"
              className="sidenav-trigger right">
              <i
                className="material-icons">
                {strings[language].iconMenu}
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
  language:PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  inSession: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  editStoreSwitch: PropTypes.func.isRequired,
  user: PropTypes.any,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default Navbar
