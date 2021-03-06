import React from 'react'
import PropTypes from 'prop-types'

import { getPriceFormat } from '../../models/tools'

import CartItemView from '../cartItemView/cartItemView'

const CartView = ({username, strings, cart, deleteItemCart, checkout}) => {
  const itemListComp = cart.items.map( (item, i) => (
    <CartItemView
      key={i}
      index={i}
      username={username}
      strings={strings.itemView}
      item={item}
      deleteItemCart={deleteItemCart}
    />
  ) )

  return (
    <div className="cart-view__container">
      <div className="col s12 m12 l7 cart-view__item-list">
        {itemListComp}
      </div>

      <div className="col s12 m12 l5 cart-view__summary">

        <div className="cart-view__summary__title">
          <div className="col s12">
            {strings.labelCartSummary}
          </div>
        </div>

        <div className="cart-view__summary__line">
          <div className="col s8">
            {strings.labelSummarySubTotal}
          </div>
          <div className="col s4 cart-view__summary__line__price">
            {`${cart.subTotal.symbol} ${getPriceFormat(cart.subTotal.price)}`}
          </div>
        </div>

        <div className="cart-view__summary__line">
          <div className="col s8">
            {strings.labelSummaryShipping}
          </div>
          <div className="col s4 cart-view__summary__line__price">
            {`${cart.shipping.symbol} ${getPriceFormat(cart.shipping.price)}`}
          </div>
        </div>

        <div className="cart-view__summary__line">
          <div className="col s8">
            {strings.labelSummaryTaxes}
          </div>
          <div className="col s4 cart-view__summary__line__price">
            {`${cart.total.symbol} ${getPriceFormat(0)}`}
          </div>
        </div>

        <div className="cart-view__summary__line-total">
          <div className="col s8">
            {strings.labelSummaryTotal}
          </div>
          <div className="col s4 cart-view__summary__line__price">
            {`${cart.total.symbol} ${getPriceFormat(cart.total.price)}`}
          </div>
        </div>

        <div className="cart-view__summary__line">
          <div className="col s12">
            <a
              onClick={ () => checkout() }
              className="waves-effect waves-light btn-small z-depth-0 cart-view__summary__button"
            >
              {strings.buttonCheckout}
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

CartView.propTypes = {
  username: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}

export default CartView