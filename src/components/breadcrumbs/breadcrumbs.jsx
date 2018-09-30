import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './breadcrumbs.scss'

const _strings = {
  ES:require('./strings/breadcrumbs.ES.json'),
  EN:require('./strings/breadcrumbs.EN.json')
}

import { noLinkEspace } from '../../models/tools'

const Breadcrumbs = ({ username, language, route, parent, child, onClick, disabledChild=false }) => {
  const strings = _strings[language]
  const parentComp = parent !== null ? (
    <Link
      to={`/${username}${route}/${noLinkEspace(parent)}`}
      className="breadcrumb valign-wrapper"
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
    <a className="breadcrumb valign-wrapper">{child}</a>
  ) : (
    <Link to={childLink} className="breadcrumb valign-wrapper">{child}</Link>
  )

  return (
    <div className="center-align c-breadcrumb">
      <div className="col s12 valign-wrapper">
        <Link to={`/${username}`} className="breadcrumb valign-wrapper">{strings.breadcrumbHome}</Link>
        {parentComp}
        {childComp}
      </div>
    </div>
  )
}

Breadcrumbs.propTypes = {
  username: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  parent: PropTypes.any,
  child: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabledChild: PropTypes.bool
}

export default Breadcrumbs
