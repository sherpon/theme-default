import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { noLinkEspace, getPriceFormat } from '../../../models/tools.js'

const PreviewItem = ({username, item}) => (
  <div className="col s6 m6 l4">
    <Link to={`/${username}/item/${noLinkEspace(item.shortTitle)}/${item.id}`}>
    <div className="preview-item hoverable">
      <img className="responsive-img" src={item.picture1}/>
      <div className="sherpon-preview-item-body">
        <div className="center-align sherpon-preview-item-body-title">
          {item.shortTitle}
        </div>
        <div className="center-align sherpon-color-text-primary">
          {`${item.symbol}${getPriceFormat(item.price)}`}
        </div>
      </div>
    </div>
    </Link>
  </div>
)

PreviewItem.propTypes = {
  username: PropTypes.string.isRequired,
  item: PropTypes.any.isRequired
}

export default PreviewItem
