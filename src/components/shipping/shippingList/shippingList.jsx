import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getPriceFormat } from '../../../models/tools'

import style from './shippingList.scss'

const _strings = {
  ES:require('./strings/shippingList.ES.json'),
  EN:require('./strings/shippingList.EN.json')
}

const Shipping = ({ strings, shipping }) => (
  <div className="row">
    <div className="col s12 m4">
      <b>{shipping.description}</b>
    </div>
    <div className="col s12 m3">
      {`${shipping.currency} - ${shipping.symbol} ${getPriceFormat(shipping.price)}`}
    </div>
    <div className="col s12 m5">
      {`${strings.labelTime}: ${shipping.days} ${strings.labelDays}`}
    </div>
  </div>
)

Shipping.propTypes = {
  strings: PropTypes.object.isRequired,
  shipping: PropTypes.object.isRequired
}

const ShippingList = ({
    language,
    shippingList
  }) => {
  const strings = _strings[language]
  let listComp = []

  for ( let i = 0 ; i < shippingList.length ; i++ ) {
    const shipping = shippingList[i]
    listComp.push(
      <Shipping
        key={i}
        strings={strings}
        shipping={shipping}
      />
    )
    if ( (i+1) < shippingList.length ) {
      listComp.push(
        <div key={i+10000} className="shipping-list__hr"/>
      )
    }
  }

  return(
    <div className="shipping-list">
      { listComp.map((shippingComp)=>(shippingComp)) }
    </div>
  )
}

ShippingList.propTypes = {
  language: PropTypes.string.isRequired,
  shippingList: PropTypes.array.isRequired
}

export default ShippingList
