import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getFormattedTime, getPriceFormat } from '../../../models/tools.js'

import style from './purchasesList.scss'

const _strings = {
  ES:require('./strings/purchasesList.ES.json'),
  EN:require('./strings/purchasesList.EN.json')
}

const PurchaseItem = ({username, item}) => (
  <div className="row">
    <Link to={`/${username}/purchase/${item.id}`}>
      <div className="col s4 m3 purchases-list__purchase-item">{getFormattedTime(item.timestamp)}</div>
      <div className="col m3 purchases-list__purchase-item hide-on-small-only">{item.id}</div>
      <div className="col s4 m3 purchases-list__purchase-item">{item.state}</div>
      <div className="col s4 m3 purchases-list__purchase-item">{`${item.symbol} ${getPriceFormat(item.amount)}`}</div>
    </Link>
  </div>
)

PurchaseItem.propTypes = {
  username: PropTypes.string.isRequired,
  item: PropTypes.any.isRequired
}

const PurchasesList = ({username, list, language}) => {
  const strings = _strings[language]
  let listComp = []

  for (let i = 0;i<list.length;i++) {
    listComp.push(<PurchaseItem key={i} username={username} item={list[i]}/>)
  }

  return(
    <div className="purchases-list">
      <div className="row">
        <div className="col s4 m3 purchases-list__purchase-header">{strings.headerDate}</div>
        <div className="col m3 purchases-list__purchase-header hide-on-small-only">{strings.headerId}</div>
        <div className="col s4 m3 purchases-list__purchase-header">{strings.headerState}</div>
        <div className="col s4 m3 purchases-list__purchase-header">{strings.headerAmount}</div>
      </div>
      { listComp.map((itemComp)=>(itemComp)) }
    </div>
  )
}

PurchasesList.propTypes = {
  username: PropTypes.string.isRequired,
  list: PropTypes.any.isRequired,
  language: PropTypes.string.isRequired
}

export default PurchasesList
