import React from 'react'
import PropTypes from 'prop-types'

import { getFormattedTime, getPriceFormat } from '../../models/tools.js'

import CartItemView from '../cartItemView/cartItemView'

const PurchaseInformation = ({className, strings, purchase}) => (
  <div className={`purchase-information ${className}`}>
    <div className="purchase-information__title">{strings.purchaseInformation.title}</div>
    <div className="purchase-information__line">
      <div className="col s6">
        {strings.purchaseInformation.id}
      </div>
      <div className="col s6 col-right">
        {purchase.id}
      </div>
    </div>
    <div className="purchase-information__line">
      <div className="col s6">
        {strings.purchaseInformation.date}
      </div>
      <div className="col s6 col-right">
        {getFormattedTime(purchase.timestamp)}
      </div>
    </div>
    <div className="purchase-information__line">
      <div className="col s6">
        {strings.purchaseInformation.state}
      </div>
      <div className="col s6 col-right">
        {purchase.state}
      </div>
    </div>
    <div className="purchase-information__line">
      <div className="col s6">
        {strings.purchaseInformation.labelSubTotal}
      </div>
      <div className="col s6 col-right">
        {`${purchase.cart.subTotal.symbol} ${getPriceFormat(purchase.cart.subTotal.price)}`}
      </div>
    </div>
    <div className="purchase-information__line">
      <div className="col s6">
        {strings.purchaseInformation.labelShipping}
      </div>
      <div className="col s6 col-right">
        {`${purchase.cart.shipping.symbol} ${getPriceFormat(purchase.cart.shipping.price)}`}
      </div>
    </div>
    <div className="purchase-information__line">
      <div className="col s6">
        {strings.purchaseInformation.labelTaxes}
      </div>
      <div className="col s6 col-right">
        {`${purchase.cart.total.symbol} ${getPriceFormat(0)}`}
      </div>
    </div>
    <div className="purchase-information__line purchase-information__line--primary-color">
      <div className="col s6">
        {strings.purchaseInformation.labelTotal}
      </div>
      <div className="col s6 col-right">
        {`${purchase.cart.total.symbol} ${getPriceFormat(purchase.cart.total.price)}`}
      </div>
    </div>
  </div>
)

const PersonalInformation = ({strings, purchase}) => (
  <div className="personal-information">
    <div className="personal-information__title">
      {strings.personalInformation.title}
    </div>
    <div className="personal-information__line">
      {purchase.user.name}
    </div>
    <div className="personal-information__line">
      {purchase.user.lastname}
    </div>
    <div className="personal-information__line">
      {purchase.user.phone}
    </div>
    <div className="personal-information__line">
      {purchase.user.email}
    </div>
  </div>
)

const AddressInformation = ({title, address}) => (
  <div className="personal-information">
    <div className="personal-information__title">
      {title}
    </div>
    <div className="personal-information__line">
      {address.name}
    </div>
    <div className="personal-information__line">
      {address.lastname}
    </div>
    <div className="personal-information__line">
      {address.address1}
    </div>
    <div className="personal-information__line">
      {address.address2}
    </div>
    <div className="personal-information__line">
      {address.city}
    </div>
    <div className="personal-information__line">
      {address.state}
    </div>
    <div className="personal-information__line">
      {address.zipCode}
    </div>
    <div className="personal-information__line">
      {address.country}
    </div>
  </div>
)

const PurchaseView = ({strings, username, purchase}) => {
  const itemListComp = purchase.cart.items.map( (item, i) => (
    <CartItemView
      key={i}
      index={i}
      username={username}
      strings={strings.itemView}
      item={item}
      deleteItemCart={ () => false }
      deleteButton={false}
    />
  ) )

  return (
    <div className="purchase-view">
      <div className="col s12 m6 l6">
        <PurchaseInformation
          className="hide-on-med-and-up"
          strings={strings}
          purchase={purchase}
        />
        {itemListComp}
      </div>

      <div className="col s12 m6 l6">
        <PurchaseInformation
          className="hide-on-small-only"
          strings={strings}
          purchase={purchase}
        />
        <PersonalInformation
          strings={strings}
          purchase={purchase}
        />
        <AddressInformation
          title={strings.shippingInformation}
          address={purchase.shipping}
        />
        <AddressInformation
          title={strings.billingInformation}
          address={purchase.billing}
        />
      </div>
    </div>
  )
}

PurchaseView.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  purchase: PropTypes.object.isRequired
}

export default PurchaseView
