import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { noLinkEspace, getPriceFormat } from '../../models/tools.js'

const ProductItem = ({username, item}) => (
  <div className="row">
    <Link to={`/${username}/product/${noLinkEspace(item.shortTitle)}/${item.id}`}>
      <div className="col s4 m3 products-list__item">{item.shortTitle}</div>
      <div className="col m3 products-list__item hide-on-small-only">{item.id}</div>
      <div className="col s4 m3 products-list__item">{`${item.symbol} ${getPriceFormat(item.price)}`}</div>
      <div className="col s4 m3 products-list__item">{item.stock}</div>
    </Link>
  </div>
)

ProductItem.propTypes = {
  username: PropTypes.string.isRequired,
  item: PropTypes.any.isRequired
}

const ProductsList = ({username, list, strings}) => {
  let listComp = []

  for (let i = 0;i<list.length;i++) {
    listComp.push(<ProductItem key={i} username={username} item={list[i]}/>)
  }

  return(
    <div className="products-list">
      <div className="row">
        <div className="col s4 m3 products-list__header">{strings.headerTitle}</div>
        <div className="col m3 products-list__header hide-on-small-only">{strings.headerId}</div>
        <div className="col s4 m3 products-list__header">{strings.headerPrice}</div>
        <div className="col s4 m3 products-list__header">{strings.headerStock}</div>
      </div>
      { listComp.map((itemComp)=>(itemComp)) }
    </div>
  )
}

ProductsList.propTypes = {
  username: PropTypes.string.isRequired,
  list: PropTypes.any.isRequired,
  strings: PropTypes.object.isRequired
}

export default ProductsList
