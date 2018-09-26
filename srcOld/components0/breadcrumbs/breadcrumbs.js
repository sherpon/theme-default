import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { noLinkEspace } from '../../models/tools'

const Breadcrumbs = ({ username, home, route, parent, child, onClick, disabledChild=false }) => {
  const parentComp = parent !== null ? (
    <Link 
      to={`/${username}${route}/${noLinkEspace(parent)}`} 
      className="breadcrumb valign-wrapper sherpon-color-text-body-secundary"
      onClick={ () => onClick(parent)}
    >
      {parent}
    </Link>
  ) : (<a/>)

  const childLink = parent !== null ? (
    `/${username}${route}/${noLinkEspace(parent)}/${noLinkEspace(child)}`
  ) : (
    `/${username}${route}/${noLinkEspace(child)}`
  )
  
  const childComp = disabledChild ? (
    <a className="breadcrumb valign-wrapper sherpon-color-text-body-secundary">{child}</a>
  ) : (
    <Link to={childLink} className="breadcrumb valign-wrapper sherpon-color-text-body-secundary">{child}</Link>
  )

  return (
    <div className="sherpon-box center-align sherpon-padding-1em sherpon-breadcrumb-padding-top-bottom-05em">
      <div className="col s12 valign-wrapper">
        <Link to={`/${username}`} className="breadcrumb valign-wrapper sherpon-color-text-body-secundary">{home}</Link>
        {parentComp}
        {childComp}
      </div>
    </div>
  )
}

Breadcrumbs.propTypes = {
  username: PropTypes.string.isRequired,
  home: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  parent: PropTypes.any,
  child: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabledChild: PropTypes.bool
}

export default Breadcrumbs