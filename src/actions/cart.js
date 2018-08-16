import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
import history from '../models/history'
import session from '../models/session'
import { culqi } from '../models/paymentGateway/culqi'
import { createPurchase } from '../api/purchase'
import Strings from '../strings'

const updateCart = () => (dispatch, getState) => {
  session.setCart( getState().cart )
  dispatch(stopFetching())
}

const cleanCart = () => (dispatch, getState) => {
  session.unsetCart()
  dispatch({
    type: types.CLEAN_CART
  })
}

// recibe el index de item en el array del cart
export const deleteItemCart = (index) => (dispatch, getState) => {
  dispatch(startFetching())
  const { cart } = getState()
  let { quantity, items, shipping, subTotal, taxes, total } = cart

  const _item = cart.items[index]

  quantity -= _item.amount
  items.splice(index, 1)
  shipping.price -= _item.amount * _item.shipping.price
  subTotal.price -= _item.amount * _item.price
  //taxes
  total.price -= ( (_item.amount * _item.shipping.price) + (_item.amount * _item.price) )

  dispatch({
    type: types.DELETE_ITEM_CART,
    quantity,
    items,
    shipping,
    subTotal,
    total
  })

  return dispatch(updateCart())
}

export const checkout = () => (dispatch, getState) => {
  const checkoutUrl = `/${getState().store.username}/checkout`
  const loginUrl = `/${getState().store.username}/login/checkout`

  if ( session.inUserSession() ) {
    // si existe session de usuario manda al checkout
    history.push({
      pathname: checkoutUrl,
      state: { some: "state" }
    })
  } else {
    // de lo contrario lo manda al login, luego lo envia al checkout
    localStorage.setItem("NEXT_URL", checkoutUrl)
    history.push({
      pathname: loginUrl,
      state: { some: "state" }
    })
  }
}

export const placeOrder = () => (dispatch, getState) => {
  const _name = document.getElementById('checkout-view__form__name__input').value
  const _lastname = document.getElementById('checkout-view__form__lastname__input').value
  const _phone = document.getElementById('checkout-view__form__phone__input').value
  const _email = document.getElementById('checkout-view__form__email__input').value

  if (
    _name==='' ||
    _lastname==='' ||
    _phone==='' ||
    _email===''
  ) {
    M.toast({html: Strings(getState().language).checkoutPage.errorIncompletedForm})
    return false
  }
  const personalInformation = {
    id: ( session.inUserSession() ) ? ( session.getUser() ) : ( null ), // if there's a session give the user's id, else give 'null'
    name: _name,
    lastname: _lastname,
    phone: _phone,
    email: _email
  }

  const _shipping_name = document.getElementById('checkout-view__form__shipping-name__input').value
  const _shipping_lastname = document.getElementById('checkout-view__form__shipping-lastname__input').value
  const _address1 = document.getElementById('checkout-view__form__address1__input').value
  const _address2 = document.getElementById('checkout-view__form__address2__input').value
  const _city = document.getElementById('checkout-view__form__city__input').value
  const _state = document.getElementById('checkout-view__form__state__input').value
  const _zip_code = document.getElementById('checkout-view__form__zip-code__input').value
  const _country = document.getElementById('checkout-view__form__country__input').value

  if (
    _shipping_name==='' ||
    _shipping_lastname==='' ||
    _address1==='' ||
    _address2==='' ||
    _city==='' ||
    _state==='' ||
    _zip_code==='' ||
    _country===''
  ) {
    M.toast({html: Strings(getState().language).checkoutPage.errorIncompletedForm})
    return false
  }
  const shipping = {
    name: _shipping_name,
    lastname: _shipping_lastname,
    address1: _address1,
    address2: _address2,
    city: _city,
    state: _state,
    zipCode: _zip_code,
    country: _country
  }

  const _billing_checkbox = document.getElementById('checkout-view__form__billing-checkbox').checked

  let _billing_name = document.getElementById('checkout-view__form__billing-name__input').value
  let _billing_lastname = document.getElementById('checkout-view__form__billing-lastname__input').value
  let _billing_address1 = document.getElementById('checkout-view__form__billing-address1__input').value
  let _billing_address2 = document.getElementById('checkout-view__form__billing-address2__input').value
  let _billing_city = document.getElementById('checkout-view__form__billing-city__input').value
  let _billing_state = document.getElementById('checkout-view__form__billing-state__input').value
  let _billing_zip_code = document.getElementById('checkout-view__form__billing-zip-code__input').value
  let _billing_country = document.getElementById('checkout-view__form__billing-country__input').value

  if (_billing_checkbox) {
    // se usa la misma informacion de shipping
    _billing_name = _shipping_name
    _billing_lastname = _shipping_lastname
    _billing_address1 = _address1
    _billing_address2 = _address2
    _billing_city = _city
    _billing_state = _state
    _billing_zip_code = _zip_code
    _billing_country = _country
  } else {
    // se usa informacion distinta
    if (
      _billing_name==='' ||
      _billing_lastname==='' ||
      _billing_address1==='' ||
      _billing_address2==='' ||
      _billing_city==='' ||
      _billing_state==='' ||
      _billing_zip_code==='' ||
      _billing_country===''
    ) {
      M.toast({html: Strings(getState().language).checkoutPage.errorIncompletedForm})
      return false
    }
  }
  const billing = {
    name: _billing_name,
    lastname: _billing_lastname,
    address1: _billing_address1,
    address2: _billing_address2,
    city: _billing_city,
    state: _billing_state,
    zipCode: _billing_zip_code,
    country: _billing_country
  }

  // segun la antiguedad del cart, verifica el stock de los articulos antes de pasar la compra
  // ...

  /*
  ReactGA.event({
    category: 'Item',
    action: 'pay',
    value: amount
  });

  // Standard event (can be used for conversion tracking
  // and optimizing in addition to audience building)
  fbq('track', 'Purchase', {currency: 'PEN', value: amount});
   */

  // lanza la pasarela de pago
  // segun resultado, registra la comprar con el token
  switch (getState().store.paymentGateway.name) {
    case 'culqi':
      dispatch(startFetching())
      culqi(
        getState().store.name,
        getState().store.shortDescription,
        getState().cart,
        getState().store.paymentGateway.publicKey,
        () => {
          // callback
          //$("#loading").show()
          if (Culqi.token) { // Token creado exitosamente!
            // Obtener el token ID
            var token = Culqi.token.id;
            console.log('Se ha creado un token: '+token)
            console.log('Culqi.token: ')
            console.log(Culqi.token)

            const _order = {
              user: personalInformation,
              cart: getState().cart,
              payment: {
                token:token,
                card_number:Culqi.token.card_number
              },
              shipping,
              billing
            }

            console.log(_order)
            //console.log(Culqi.error)
            //console.log(Culqi.error.mensaje)

            createPurchase (
              _order,
              (response) => {
                // .......limpiar carrito
                // session.unsetCart()
                dispatch(cleanCart())
                dispatch(stopFetching())
                history.replace({
                  pathname: "/" + getState().store.username + '/congratulation/purchase',
                  state: { some: "state" }
                })
              }
            )
          } else { // Hubo algun problema!
            // Mostramos JSON de objeto error en consola
            console.log(Culqi.error)
            console.log(Culqi.error.mensaje)
            //$("#loading").hide()
            dispatch(stopFetching())
            M.toast({html: 'Se produjo un error con el pago'})
          }
        }
      )
      break
    default:
      return false
  }

}
