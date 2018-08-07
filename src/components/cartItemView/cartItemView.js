import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { noLinkEspace, getPriceFormat } from '../../models/tools'

const CartItemView = ({index, username, strings, item, deleteItemCart}) => {
  let attributesComp, shippingComp

  if (item.type==='clothes') {
    attributesComp = (
      <div>
        <div className="cart-item-view__body__model">
          {`${strings.labelSize}: ${item.attributes[0]}`}
        </div>

        <div className="cart-item-view__body__model">
          {`${strings.labelColor}: ${item.attributes[1]}`}
        </div>
      </div>
    )
  } else if (item.type==='models') {
    attributesComp = (
      <div className="cart-item-view__body__model">
        {`${strings.labelModel}: ${item.attributes[0]}`}
      </div>
    )
  } else {
    attributesComp = (<div/>)
  }

  if (JSON.stringify(item.shipping)!==JSON.stringify({ "currency":"", "symbol":"", "price":Number(0)})) {
    const price = (item.shipping.price===0) ? (strings.labelFree) : (`${item.shipping.symbol} ${getPriceFormat(item.shipping.price)}`)
    shippingComp = (
      <div className="cart-item-view__body__model">
        {`${item.shipping.description} (${item.shipping.days}) - ${price}`}
      </div>
    )
  } else {
    shippingComp = (<div/>)
  }

  return(
    <div className="cart-item-view__container">
      <div className="cart-item-view__body">
        <div className="col s4 m2 l4">
          <img 
            className="responsive-img" 
            src={item.picture}
          />
        </div>
        <div className="col s8 m10 l8">
          <Link to={`/${username}/item/${noLinkEspace(item.shortTitle)}/${item.id}`}>
            <div className="cart-item-view__body__title">
              {item.shortTitle}
            </div>
          </Link>
          <div className="cart-item-view__body__id">
            {`${strings.labelId}: ${item.id}`}
          </div>
          {attributesComp}
          {shippingComp}
          <div className="cart-item-view__body__model">
            <a 
              className="cart-item-view__body__delete" 
              onClick={ () => deleteItemCart(index) }
            >
              {strings.labelDelete}
            </a>
          </div>
        </div>
      </div>

      <div className="cart-item-view__footer">
        <div className="col s4">
          <div className="cart-item-view__footer__title">
            {strings.price}
          </div>
          <div className="cart-item-view__footer__content">
            {`${item.symbol} ${getPriceFormat(item.price)}`}
          </div>
        </div>
        <div className="col s4">
          <div className="cart-item-view__footer__title">
            {strings.amount}
          </div>
          <div className="cart-item-view__footer__content">
            {item.amount}
          </div>
        </div>
        <div className="col s4">
          <div className="cart-item-view__footer__title">
            {strings.total}
          </div>
          <div className="cart-item-view__footer__content">
            {`${item.symbol} ${getPriceFormat(item.price * item.amount)}`}
          </div>
        </div>
      </div>
    </div>
  )
}

CartItemView.propTypes = {
  index: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  deleteItemCart: PropTypes.func.isRequired
}

export default CartItemView