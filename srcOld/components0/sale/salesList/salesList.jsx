import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getFormattedTime, getPriceFormat } from '../../../models/tools.js'

const SaleItem = ({username, item}) => (
  <div className="row">
    <Link to={`/${username}/sale/${item.id}`}>
      <div className="col s4 m3 sales-list__item">{getFormattedTime(item.timestamp)}</div>
      <div className="col m3 sales-list__item hide-on-small-only">{item.id}</div>
      <div className="col s4 m3 sales-list__item">{item.state}</div>
      <div className="col s4 m3 sales-list__item">{`${item.symbol} ${getPriceFormat(item.amount)}`}</div>
    </Link>
  </div>
)

SaleItem.propTypes = {
  username: PropTypes.string.isRequired,
  item: PropTypes.any.isRequired
}

const SalesList = ({username, list, strings}) => {
  let listComp = []

  for (let i = 0;i<list.length;i++) {
    listComp.push(<SaleItem key={i} username={username} item={list[i]}/>)
  }

  return(
    <div className="sales-list">
      <div className="row">
        <div className="col s4 m3 sales-list__header">{strings.headerDate}</div>
        <div className="col m3 sales-list__header hide-on-small-only">{strings.headerId}</div>
        <div className="col s4 m3 sales-list__header">{strings.headerState}</div>
        <div className="col s4 m3 sales-list__header">{strings.headerAmount}</div>
      </div>
      { listComp.map((itemComp)=>(itemComp)) }
    </div>
  )
}

SalesList.propTypes = {
  username: PropTypes.string.isRequired,
  list: PropTypes.any.isRequired,
  strings: PropTypes.object.isRequired
}

export default SalesList
