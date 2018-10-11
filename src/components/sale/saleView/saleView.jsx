import React from 'react'
import PropTypes from 'prop-types'

import { getFormattedTime, getPriceFormat } from '../../../models/tools.js'

import SaleItemView from '../saleItemView/saleItemView.jsx'

import style from './saleView.scss'

const _strings = {
  ES: require('./strings/saleView.ES.json'),
  EN: require('./strings/saleView.EN.json')
}

const SaleInformation = ({className, strings, purchase}) => (
  <div className={`purchase-information ${className}`}>
    <div className="purchase-information__title">{strings.purchaseInformation.title}</div>
    <div className="purchase-information__line row">
      <div className="col s6">
        {strings.purchaseInformation.id}
      </div>
      <div className="col s6 col-right purchase-information__id">
        {purchase.id}
      </div>
    </div>
    <div className="purchase-information__line row">
      <div className="col s6">
        {strings.purchaseInformation.date}
      </div>
      <div className="col s6 col-right">
        {getFormattedTime(purchase.timestamp)}
      </div>
    </div>
    <div className="purchase-information__line row">
      <div className="col s6">
        {strings.purchaseInformation.state}
      </div>
      <div className="col s6 col-right">
        {purchase.state}
      </div>
    </div>
    <div className="purchase-information__line row">
      <div className="col s6">
        {strings.purchaseInformation.labelSubTotal}
      </div>
      <div className="col s6 col-right">
        {`${purchase.cart.subTotal.symbol} ${getPriceFormat(purchase.cart.subTotal.price)}`}
      </div>
    </div>
    <div className="purchase-information__line row">
      <div className="col s6">
        {strings.purchaseInformation.labelShipping}
      </div>
      <div className="col s6 col-right">
        {`${purchase.cart.shipping.symbol} ${getPriceFormat(purchase.cart.shipping.price)}`}
      </div>
    </div>
    {/*
      <div className="purchase-information__line row">
        <div className="col s6">
          {strings.purchaseInformation.labelTaxes}
        </div>
        <div className="col s6 col-right">
          {`${purchase.cart.total.symbol} ${getPriceFormat(0)}`}
        </div>
      </div>
    */}

    <div className="purchase-information__line row purchase-information__line--primary-color">
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

const UpdateInformation = ({ strings, saleId, stateSale, updateStateSale }) => {
  if ( stateSale === 'pending') {
    return(
      <div className="update-information">
        <div className="update-information__title">
          {strings.title}
        </div>
        <div className="update-information__line">
          <a
            onClick={ () => updateStateSale() }
            className="waves-effect waves-light btn-small z-depth-0"
          >
            {strings.buttonUpdateToSended}
          </a>
        </div>
      </div>
    )
  } else {
    return(<div/>)
  }
}

const SaleView = ({language, username, sale, deleteButton}) => {
  const strings = _strings[language]

  const itemListComp = sale.cart.items.map( (item, i) => (
    <SaleItemView
      key={i}
      index={i}
      username={username}
      strings={strings.itemView}
      item={item}
      deleteItemCart={ () => false }
      deleteButton={deleteButton}
    />
  ) )

  return (
    <div className="sale-view row">
      <div className="col s12 m6 l6">
        <SaleInformation
          className="hide-on-med-and-up"
          strings={strings}
          purchase={sale}
        />
        {itemListComp}
      </div>

      <div className="col s12 m6 l6">
        <SaleInformation
          className="hide-on-small-only"
          strings={strings}
          purchase={sale}
        />
        <PersonalInformation
          strings={strings}
          purchase={sale}
        />
        <AddressInformation
          title={strings.shippingInformation}
          address={sale.shipping}
        />
        <AddressInformation
          title={strings.billingInformation}
          address={sale.billing}
        />
      {/*
        <UpdateInformation
          strings={strings.UpdateInformation}
          saleId={sale.id}
          stateSale={sale.state}
          updateStateSale={ () => false }
        />
      */}

      </div>
    </div>
  )
}

SaleView.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sale: PropTypes.object.isRequired,
  deleteButton: PropTypes.bool.isRequired
}

export default SaleView
