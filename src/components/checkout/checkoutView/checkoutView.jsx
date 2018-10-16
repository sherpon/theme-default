import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

import { getPriceFormat } from '../../../models/tools'

import session from '../../../models/session'

import style from './checkoutView.scss'

const _strings = {
  ES: require('./strings/checkoutView.ES.json'),
  EN: require('./strings/checkoutView.EN.json')
}

const CheckoutView = ({language, cart, placeOrder}) => {
  const strings = _strings[language]
  const useShippingInformation = ()  => {
    $('#checkout-view__form__billing__information-content').toggleClass('checkout-view__form__billing__information--display-none')
  }

  const checkTermsAndConditions = () => {
    $('#checkout-button').toggleClass('disabled')
  }

  let _name, _lastname, _phone, _email

  if (session.inUserSession()) {
    _name = session.getUser().name
    _lastname = session.getUser().lastname
    _phone = session.getUser().phone
    _email = session.getUser().email

    // activa los text inputs
    $(document).ready(function() {
      M.updateTextFields()
    })
  } else {
    _name = ''
    _lastname = ''
    _phone = ''
    _email = ''
  }

  return (
    <div className="checkout-view__container">
      <div className="col s12 m12 l7 checkout-view__form">
{/****************************** PERSONAL INFORMATION *****************************/}
        <div className="checkout-view__form__personal__information">
          <div className="checkout-view__form__title">
            {strings.personalInformation.labelTitle}
          </div>
          <div className="input-field">
            <input disabled id="checkout-view__form__name__input" type="text" defaultValue={_name}/>
            <label htmlFor="checkout-view__form__name__input">{strings.personalInformation.labelName}</label>
          </div>
          <div className="input-field">
            <input disabled id="checkout-view__form__lastname__input" type="text" defaultValue={_lastname}/>
            <label htmlFor="checkout-view__form__lastname__input">{strings.personalInformation.labelLastname}</label>
          </div>
          <div className="input-field">
            <input disabled id="checkout-view__form__phone__input" type="text" defaultValue={_phone}/>
            <label htmlFor="checkout-view__form__phone__input">{strings.personalInformation.labelPhone}</label>
          </div>
          <div className="input-field">
            <input disabled id="checkout-view__form__email__input" type="text" defaultValue={_email}/>
            <label htmlFor="checkout-view__form__email__input">{strings.personalInformation.labelEmail}</label>
          </div>
        </div>
{/****************************** END PERSONAL INFORMATION *****************************/}

{/****************************** SHIPPING INFORMATION *****************************/}
        <div className="checkout-view__form__shipping__information">
          <div className="checkout-view__form__title">
            {strings.shippingInformation.labelTitle}
          </div>
          <div className="input-field">
            <input id="checkout-view__form__shipping-name__input" type="text"/>
            <label htmlFor="checkout-view__form__shipping-name__input">{strings.shippingInformation.labelName}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__shipping-lastname__input" type="text"/>
            <label htmlFor="checkout-view__form__shipping-lastname__input">{strings.shippingInformation.labelLastname}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__address1__input" type="text"/>
            <label htmlFor="checkout-view__form__address1__input">{strings.shippingInformation.labelAddress1}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__address2__input" type="text"/>
            <label htmlFor="checkout-view__form__address2__input">{strings.shippingInformation.labelAddress2}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__city__input" type="text"/>
            <label htmlFor="checkout-view__form__city__input">{strings.shippingInformation.labelCity}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__state__input" type="text"/>
            <label htmlFor="checkout-view__form__state__input">{strings.shippingInformation.labelState}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__zip-code__input" type="text"/>
            <label htmlFor="checkout-view__form__zip-code__input">{strings.shippingInformation.labelZipCode}</label>
          </div>
          <div className="input-field">
            <input id="checkout-view__form__country__input" type="text"/>
            <label htmlFor="checkout-view__form__country__input">{strings.shippingInformation.labelCountry}</label>
          </div>
        </div>
{/****************************** END SHIPPING INFORMATION *****************************/}

{/****************************** BILLING INFORMATION *****************************/}
        <div className="checkout-view__form__billing__information">
          <div className="checkout-view__form__title">
            {strings.billingInformation.labelTitle}
          </div>
          <div className="">
            <label htmlFor="checkout-view__form__billing-checkbox">
              <input id="checkout-view__form__billing-checkbox" type="checkbox" onClick={ () => useShippingInformation() }/>
              <span>
                {strings.billingInformation.labelOption}
              </span>
            </label>
          </div>

          <div id="checkout-view__form__billing__information-content">
            <div className="input-field">
              <input id="checkout-view__form__billing-name__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-name__input">{strings.shippingInformation.labelName}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-lastname__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-lastname__input">{strings.shippingInformation.labelLastname}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-address1__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-address1__input">{strings.shippingInformation.labelAddress1}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-address2__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-address2__input">{strings.shippingInformation.labelAddress2}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-city__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-city__input">{strings.shippingInformation.labelCity}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-state__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-state__input">{strings.shippingInformation.labelState}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-zip-code__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-zip-code__input">{strings.shippingInformation.labelZipCode}</label>
            </div>
            <div className="input-field">
              <input id="checkout-view__form__billing-country__input" type="text"/>
              <label htmlFor="checkout-view__form__billing-country__input">{strings.shippingInformation.labelCountry}</label>
            </div>
          </div>

        </div>
{/****************************** END BILLING INFORMATION *****************************/}

      </div>

      <div className="col s12 m12 l5 checkout-view__summary">

        <div className="checkout-view__summary__title row">
          <div className="col s12">
            {strings.labelCartSummary}
          </div>
        </div>

        <div className="checkout-view__summary__line row">
          <div className="col s8">
            {strings.labelSummarySubTotal}
          </div>
          <div className="col s4 checkout-view__summary__line__price">
            {`${cart.subTotal.symbol} ${getPriceFormat(cart.subTotal.price)}`}
          </div>
        </div>

        <div className="checkout-view__summary__line row">
          <div className="col s8">
            {strings.labelSummaryShipping}
          </div>
          <div className="col s4 checkout-view__summary__line__price">
            {`${cart.shipping.symbol} ${getPriceFormat(cart.shipping.price)}`}
          </div>
        </div>

        {/*
          <div className="checkout-view__summary__line row">
            <div className="col s8">
              {strings.labelSummaryTaxes}
            </div>
            <div className="col s4 checkout-view__summary__line__price">
              {`${cart.total.symbol} ${getPriceFormat(0)}`}
            </div>
          </div>
        */}

        <div className="checkout-view__summary__line-total row">
          <div className="col s8">
            {strings.labelSummaryTotal}
          </div>
          <div className="col s4 checkout-view__summary__line__price">
            {`${cart.total.symbol} ${getPriceFormat(cart.total.price)}`}
          </div>
        </div>

        <div className="checkout-view__summary__line row">
          <div className="col s12">
            <label>
              <input type="checkbox" onClick={ () => checkTermsAndConditions() }/>
              <span>
                {strings.labelSummaryTerms}
              </span>
            </label>
          </div>
        </div>

        <div className="checkout-view__summary__line row">
          <div className="col s12">
            <button
              id="checkout-button"
              onClick={ () => placeOrder() }
              className="waves-effect waves-light btn-small z-depth-0 disabled checkout-view__summary__button"
            >
              {strings.buttonCheckout}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

CheckoutView.propTypes = {
  language: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  placeOrder: PropTypes.func.isRequired
}

export default CheckoutView
