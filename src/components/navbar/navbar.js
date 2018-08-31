import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ strings, search, inSession, isAdmin, isEditable, editStoreSwitch, user, username, logout }) => {
  let navItemsComp, sidenavComp, dropdownComp

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

    if ( isAdmin ) {
      let labelEdit
      if (isEditable) { // if is editable, so turn it down
        labelEdit = strings.navbarItemEditCompleted
      } else {  // if isn't at editable mode, so turn it up
        labelEdit = strings.navbarItemEdit
      }

      const menuListComp = [
        <li key={1}><a onClick={ () => editStoreSwitch() }>{labelEdit}</a></li>,
        //<li key={2}><Link to={`/${username}/account`}>{strings.navbarItemCategories}</Link></li>,
        <li key={3}><Link to={`/${username}/products`}>{strings.navbarItemProducts}</Link></li>,
        <li key={4}><Link to={`/${username}/account`}>{strings.navbarItemSales}</Link></li>,
        <li key={5}><Link to={`/${username}/paymentgateway`}>{strings.navbarItemPayment}</Link></li>,
        <li key={6}><Link to={`/${username}/marketing`}>{strings.navbarItemMarketing}</Link></li>,
        <li key={7} className="divider"></li>,
        <li key={8}><Link to={`/${username}/account`}>{strings.navbarItemSupportMe}</Link></li>,
        <li key={9} className="divider"></li>,
        <li key={10}><Link to={`/${username}/account`}>{strings.navbarItemAccount}</Link></li>,
        <li key={11}><Link to={`/${username}/purchases`}>{strings.navbarItemPurchases}</Link></li>,
        <li key={12} className="divider"></li>,
        <li key={13}><a onClick={ () => logout() }>{strings.navbarItemLogout}</a></li>
      ]

      // Items de menu account dropdown
      dropdownComp = (
        <ul id="dropdown1" className="dropdown-content">
          { menuListComp.map( (item) => (item) ) }
        </ul>
      )

      sidenavComp = (
        <ul className="sidenav" id="mobile-demo">
          <li className="sidenav__user-name">{`${strings.navbarItemGreeting}${user.name}`}</li>
          <li className="divider"></li>
          { menuListComp.map( (item) => (item) ) }
        </ul>
      )
    } else {
      // Items de menu account dropdown
      dropdownComp = (
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to={`/${username}/account`}>{strings.navbarItemAccount}</Link></li>
          <li><Link to={`/${username}/purchases`}>{strings.navbarItemPurchases}</Link></li>
          <li className="divider"></li>
          <li><a onClick={ () => logout() }>{strings.navbarItemLogout}</a></li>
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
    }

  } else {
    navItemsComp = (
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down">
        <li><Link to={`/${username}/login`}>{strings.navbarItemLogin}</Link></li>
      </ul>
    )

    // Items de menu account dropdown
    dropdownComp = (<ul id="dropdown1" className="dropdown-content"/>)

    sidenavComp = (
      <ul className="sidenav" id="mobile-demo">
        <li><Link to={`/${username}/login`}>{strings.navbarItemLogin}</Link></li>
      </ul>
    )
  }



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
  isAdmin: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  editStoreSwitch: PropTypes.func.isRequired,
  user: PropTypes.any,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default Navbar
