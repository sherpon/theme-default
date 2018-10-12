import React from 'react'
import PropTypes from 'prop-types'

import Product from '../index'

import style from './latestProducts.scss'

const strings = {
  ES: require('./strings/latestProducts.ES.json'),
  EN: require('./strings/latestProducts.EN.json')
}

const LatestProducts = ({ language, username, latestProducts }) => {
  let latestProductsComp

  if (latestProducts.length===0) {
    latestProductsComp = (<Product.PreviewListPlaceholder/>)
  } else {
    latestProductsComp = (<Product.PreviewList username={username} list={latestProducts}/>)
  }

  return (
    <div className="latest-products">
      <div className="latest-products__title">
        {strings[language].latestProductsTitle}
      </div>
      {latestProductsComp}
    </div>
  )
}

LatestProducts.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  latestProducts: PropTypes.array.isRequired
}

export default LatestProducts
