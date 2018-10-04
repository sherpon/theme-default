import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './tabs.scss'

const _strings = {
  ES:require('./strings/tabs.ES.json'),
  EN:require('./strings/tabs.EN.json')
}

const Tabs = ({ language, username, quantityCart }) => {
  const strings = _strings[language]
  const quantityCartComp = (quantityCart!==0) ? (
    <span
      className="quantity-cart__badge"
      data-badge-caption=""
    >
      {quantityCart}
    </span>
  ) : (<span/>)

  return (
    <div className="container">
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

        {/*
        <li className="tab col s3">
          <NavLink
            to={`/${username}/contact`}
            activeClassName="active"
          >
            {strings.tabContact}
          </NavLink>
        </li>
        */}

        {/*
        <li className="tab col s3">
          <NavLink
            to={`/${username}/terms`}
            activeClassName="active"
          >
            {strings.tabTerms}
          </NavLink>
        </li>
        */}

      </ul>
    </div>

  )
}

Tabs.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  quantityCart: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  language: state.language,
  username: state.store.username,
  quantityCart: state.cart.quantity
})

export default withRouter(connect(
  mapStateToProps,
  {}
)(Tabs))
