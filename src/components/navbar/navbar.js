import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ strings, search }) => {
  const init = () => {
    $(document).ready(function(){
      $('.sidenav').sidenav()
    })
  }

  return (
    <header>
      <nav className="nav-extended sherpon-position-relative">
        <div className="nav-wrapper container row sherpon-margin-bottom-0px">

          <div className="col s10 m10 l9">
            <div className="sherpon-search">
              <input 
                id="search-input" 
                type="text" 
                className="sherpon-search-input" 
                placeholder={strings.searchInputPlaceholder} 
                onKeyPress={ (e) => search(e) }/>
            </div>
          </div>

          <div className="col s2 m2 l3">
            <a 
              href="#" 
              data-target="mobile-demo" 
              className="sidenav-trigger right sherpon-sidenav">
              <i 
                className="material-icons sherpon-icon-menu">
                {strings.iconMenu}
              </i>
            </a>

            <ul 
              id="nav-mobile" 
              className="right hide-on-med-and-down">
              <li>
                <a 
                  href="/account" 
                  className="sherpon-icon-menu">
                  {strings.navbarItemAccount}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><a href="/account">{strings.navbarItemAccount}</a></li>
      </ul>
      { init() }
    </header>
  )
}

Navbar.propTypes = {
  strings:PropTypes.object.isRequired,
  search: PropTypes.func.isRequired
}

export default Navbar