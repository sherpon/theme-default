import React from 'react'
import PropTypes from 'prop-types'

import style from './paymentGatewayView.scss'

const _strings = {
  ES:require('./strings/paymentGatewayView.ES.json'),
  EN:require('./strings/paymentGatewayView.EN.json')
}

const PaymentGatewayView = ({
    language,
    paymentGateway,
    paymentGatewaySaveButton
  }) => {
  const strings = _strings[language]
  const init = () => {
    // activa los text inputs
    /*$(document).ready(function() {
      M.updateTextFields()
      $('select').formSelect()
    })*/
    setTimeout( () => {
      M.updateTextFields()
      var elems = document.querySelectorAll('select')
      var instances = M.FormSelect.init(elems)
    },100 )
  }

  return (
    <div className="payment-gateway-view">

      <div className="payment-gateway-view__title">
        {strings.labelTitle}
      </div>
      <div className="input-field">
        <select id="payment-gateway-view__name" defaultValue={paymentGateway.name}>
          <option value="" disabled>-</option>
          <option value="culqi">Culqi</option>
        </select>
        <label htmlFor="payment-gateway-view__name">{strings.labelPaymentGateway}</label>
      </div>
      <div className="input-field">
        <input id="payment-gateway-view__public-key" type="text" defaultValue={paymentGateway.publicKey}/>
        <label htmlFor="payment-gateway-view__public-key">{strings.labelPublicKey}</label>
      </div>
      <div className="input-field">
        <input id="payment-gateway-view__private-key" type="text" defaultValue={paymentGateway.privateKey}/>
        <label htmlFor="payment-gateway-view__private-key">{strings.labelPrivateKey}</label>
      </div>
      <div className="payment-gateway-view__button">
        <a
          onClick={ () => paymentGatewaySaveButton() }
          className="waves-effect waves-light btn-small z-depth-0"
        >
          {strings.buttonSave}
        </a>
      </div>

      {init()}
    </div>
  )
}

PaymentGatewayView.propsType = {
  language: PropTypes.string.isRequired,
  paymentGateway: PropTypes.object.isRequired,
  paymentGatewaySaveButton: PropTypes.func.isRequired
}

export default PaymentGatewayView
