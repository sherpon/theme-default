import React from 'react'
import PropTypes from 'prop-types'
//import $ from 'jquery'

import style from './shippingModal.scss'

const _strings = {
  ES:require('./strings/shippingModal.ES.json'),
  EN:require('./strings/shippingModal.EN.json')
}

class ShippingModal extends React.Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this._cancel = this._cancel.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount() {
    //const { shortDescription } = this.props
    //$('#shipping-modal').val(shortDescription)
    //M.textareaAutoResize($('#shipping-modal'))
  }

  _onChange() {
    //$('#shipping-modal__parent__input').toggleClass('shipping-modal__parent--hidden')
    /*const _ = document.querySelector('input[name="group1"]:checked').value
    if ( _ === '') {
      $('#shipping-modal__parent').toggleClass('disabled')
    } else {
      $('#shipping-modal__parent').toggleClass('disabled')
    }*/
  }

  _cancel() {
    //$('#shipping-modal').modal('close')
    var elems = document.querySelectorAll('#shipping-modal')
    var instances = M.Modal.init(elems)
    instances[0].close()
    document.body.style.overflow = ''
  }

  _save() {
    const { shippingCreateButton } = this.props
    shippingCreateButton()
  }

  render() {
    const { language, shipping } = this.props
    const strings = _strings[language]
    const cancel = this._cancel
    const save = this._save

    const init = () => {
      setTimeout( () => {
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems)
        var elems = document.querySelectorAll('select')
        var instances = M.FormSelect.init(elems)
        M.updateTextFields()
      },100 )
    }

    return(
      <div
        id="shipping-modal"
        className="modal shipping-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>

          <div className="input-field shipping-modal__row">
            <input id="shipping-modal__description" type="text"
              defaultValue={ ( shipping === undefined ) ? ('') : (shipping.description) }
            />
            <label htmlFor="shipping-modal__description">
              {strings.labelShippingDescription}
            </label>
          </div>

          <div className="input-field shipping-modal__row">
            <input id="shipping-modal__price" type="number"
              defaultValue={ ( shipping === undefined ) ? (0) : (shipping.price) }
            />
            <label htmlFor="shipping-modal__price">
              {strings.labelShippingPrice}
            </label>
          </div>

          <div className="input-field shipping-modal__row">
            <select id="shipping-modal__currency"
              defaultValue={ ( shipping === undefined ) ? ('{}') : (`{ "symbol":"${shipping.symbol}", "currency":"${shipping.currency}" }`) }
            >
              <option value='{}' disabled>-</option>
              <option value='{ "symbol":"S/.", "currency":"PEN" }'>{strings.labelShippingCurrencyPEN}</option>
              <option value='{ "symbol":"$", "currency":"USD" }'>{strings.labelShippingCurrencyUSD}</option>
            </select>
            <label htmlFor="shipping-modal__currency">
              {strings.labelShippingCurrency}
            </label>
          </div>

          <div className="input-field shipping-modal__row">
            <input id="shipping-modal__time" type="number"
              defaultValue={ ( shipping === undefined ) ? (0) : (shipping.days) }
            />
            <label htmlFor="shipping-modal__time">
              {strings.labelShippingTime}
            </label>
          </div>

        </div>

        <div className="modal-footer">
          <a className="waves-effect btn-flat"
            onClick={ () => cancel() }
          >
            {strings.buttonCancel}
          </a>
          <a className="waves-effect waves-light btn-small z-depth-0"
            onClick={ () => save() }
          >
            {strings.buttonSave}
          </a>
        </div>
        {
          init()
        }
      </div>
    )
  }
}

ShippingModal.propTypes = {
  language: PropTypes.string.isRequired,
  shipping: PropTypes.object,
  shippingCreateButton: PropTypes.func.isRequired
}

export default ShippingModal
