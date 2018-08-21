import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const TabsHero = ({strings, username, quantityCart, display}) => {
  const quantityCartComp = (quantityCart!==0) ? (
    <span
      className="quantity-cart__badge"
      data-badge-caption=""
    >
      {quantityCart}
    </span>
  ) : (<span/>)

  return (
    <div className="sherpon-store-tabs-hero">
      <div className="">
        <div className="">
          <ul className="tabs">

            <li className="tab col s3">
              <NavLink
                exact
                to={`/${username}`}
                activeClassName="active"
              >
                {strings.tabHome}
              </NavLink>
            </li>

            <li className="tab col s3">
              <NavLink
                to={`/${username}/categories`}
                activeClassName="active"
              >
                {strings.tabCategories}
              </NavLink>
            </li>

            <li className="tab col s3">
              <NavLink
                to={`/${username}/cart`}
                activeClassName="active"
              >
                {strings.tabCart} {quantityCartComp}
              </NavLink>
            </li>

            <li className="tab col s3">
              <NavLink
                to={`/${username}/contact`}
                activeClassName="active"
              >
                {strings.tabContact}
              </NavLink>
            </li>

            <li className="tab col s3">
              <NavLink
                to={`/${username}/terms`}
                activeClassName="active"
              >
                {strings.tabTerms}
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

TabsHero.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  quantityCart: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired
}

export default TabsHero
