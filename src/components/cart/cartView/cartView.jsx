import React from 'react'
import PropTypes from 'prop-types'

import { getPriceFormat } from '../../../models/tools'

import CartItemView from '../cartItemView/cartItemView.jsx'

import style from './cartView.scss'

const _strings = {
  ES: require('./strings/cartView.ES.json'),
  EN: require('./strings/cartView.EN.json')
}

const CartView = ({username, language, cart, shipping, onChangedShippingSelect, deleteItemCart, checkout}) => {
  const strings = _strings[language]
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

  let shippingComp

  if (shipping.length === 0) {
    shippingComp = (<div/>)
  } else {
    const shippingItemComp = shipping.map( (shippingItem, i) => {
      const price = (shippingItem.price===0) ? (strings.labelFree) : (`${shippingItem.symbol} ${getPriceFormat(shippingItem.price)}`)
      return (<option
        key={i}
        value={ JSON.stringify(shippingItem) }
      >
        {`${shippingItem.description} (${shippingItem.days} ${strings.labelCartShippingDays}) - ${price}`}
      </option>)
    } )

    shippingComp = (
      <div className="cart-view__shipping">

        <div className="cart-view__shipping__title row">
          <div className="col s12">
            {strings.labelCartShipping}
          </div>
        </div>

        <div className="input-field cart-view__shipping__select">
          <select id="cart-view__shipping__select"
            defaultValue={ (cart.shipping.price===-1) ? ('{}') : (JSON.stringify(cart.shipping)) }
            onChange={ () => onChangedShippingSelect() }
          >
            <option value='{}' className="input-field cart-view__shipping__label" disabled>{strings.labelCartShippingInput}</option>
            {shippingItemComp}
          </select>
        </div>

      </div>
    )
  }

  const init = () => {
    setTimeout( () => {
      var elems = document.querySelectorAll('select')
      var instances = M.FormSelect.init(elems)
    },100 )
  }

  return (
    <div className="cart-view row">
      <div className="col s12 m12 l7">
        {itemListComp}
      </div>

      <div className="col s12 m12 l5">
        {shippingComp}

        <div className="cart-view__summary">
          <div className="cart-view__summary__title row">
            <div className="col s12">
              {strings.labelCartSummary}
            </div>
          </div>

          <div className="cart-view__summary__line row">
            <div className="col s8">
              {strings.labelSummarySubTotal}
            </div>
            <div className="col s4 cart-view__summary__line__price">
              {`${cart.subTotal.symbol} ${getPriceFormat(cart.subTotal.price)}`}
            </div>
          </div>

          <div className="cart-view__summary__line row">
            <div className="col s8">
              {strings.labelSummaryShipping}
            </div>
            <div className="col s4 cart-view__summary__line__price">
              {`${cart.shipping.symbol} ${getPriceFormat(cart.shipping.price)}`}
            </div>
          </div>

          {/*
          <div className="cart-view__summary__line row">
            <div className="col s8">
              {strings.labelSummaryTaxes}
            </div>
            <div className="col s4 cart-view__summary__line__price">
              {`${cart.total.symbol} ${getPriceFormat(0)}`}
            </div>
          </div>
          */}

          <div className="cart-view__summary__line-total row">
            <div className="col s8">
              {strings.labelSummaryTotal}
            </div>
            <div className="col s4 cart-view__summary__line__price">
              {`${cart.total.symbol} ${getPriceFormat(cart.total.price)}`}
            </div>
          </div>

          <div className="cart-view__summary__line row">
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
      {init()}
    </div>
  )
}

CartView.propTypes = {
  username: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
}

export default CartView
