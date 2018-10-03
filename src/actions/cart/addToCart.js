import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import { getEnv } from '../../config'
import history from '../../models/history'
import session from '../../models/session'

const _strings = {
  ES: require('./strings/addToCart.ES.json'),
  EN: require('./strings/addToCart.EN.json')
}

const goToCart = (cart, username) => {
  session.setCart(  cart )
  history.push({
    pathname: "/" + username + '/cart',
    state: { some: "state" }
  })
}

const addToCartState = (item) => {
  return (dispatch,getState) => {
    dispatch({
      type: types.ADD_TO_CART,
      item
    })

    /*ReactGA.event({
      category: 'Item',
      action: 'buy',
      value: amount
    });*/

    // Standard event (can be used for conversion tracking
    // and optimizing in addition to audience building)
    //fbq('track', 'AddToCart', {currency: 'PEN', value: amount});

    return goToCart(getState().cart, getState().store.username)
  }
}

export const addToCart = () => (dispatch, getState) => {
  const strings = _strings[getState().language]
  //const { item } = getState()
  const { product } = getState()
  const item = product

  // se verifica que haya metodo de envio
  if (item.shipping.length===0) {
    // no hay metodo de envio
  } else {
    // si lo hay, que se haya seleccionado uno
    const selectShipping = document.getElementById('item-content-shipping__select').value
    if (selectShipping==='') {
      M.toast({html: strings.errorShippingEmpty})
      return null
    }
  }
  //
  // se verifica el tipo de item
  if (item.type==='clothes') {
    // si es clothes, se verifica que se haya seleccionado todos los atributos disponibles
    const selectSize = document.getElementById('item-content-attributes__size').value
    if (selectSize==='') {
      M.toast({html: strings.errorSizeEmpty})
      return null
    }
    const selectColor = document.getElementById('item-content-attributes__color').value
    if (selectColor==='') {
      M.toast({html: strings.errorColorEmpty})
      return null
    }
    //
    // de haber seleccionado los atributos, se verifica su disponibilidad
    const wantedOption = [selectSize,selectColor]
    let selectedOption = null
    for ( let i=0 ; i<item.variations.length ; i++ ) {
        //console.log('item.variations')
        //console.log(item.variations)
      if (
        item.variations[i].attributes[0]===wantedOption[0] &&
        item.variations[i].attributes[1]===wantedOption[1]
        ) {
        selectedOption = item.variations[i]
        //console.log('selectedOption')
        //console.log(selectedOption)
        //i = item.variations.length  //
        break
      }
    }

    if (selectedOption === null || selectedOption.stock < 1) {
      M.toast({html: strings.errorNoStock})
      return null
    }

    //
    // de haber disponibilidad, se verifica que la cantidad que se solicita sea valida
    const amount = document.getElementById('item-content__addToCart__amount').value
    if (amount<1) {
      M.toast({html: strings.errorAmount})
      return null
    }
    //
    // y no sobrepase a lo disponible
    if ( (selectedOption.stock-amount) < 0 ) {
      M.toast({html: strings.errorNegativeStock})
      return null
    }

    const _item = {
      "id":item.id,
      "type":item.type,
      "shortTitle":item.shortTitle,
      "picture":item.pictures[0],
      "currency":item.currency,
      "symbol":item.symbol,
      "price":item.price,
      "amount": Number(amount),
      "attributes":selectedOption.attributes,
      "shipping": (item.shipping.length===0) ? ({ "currency":"", "symbol":"", "price":Number(0)}) : ( JSON.parse(document.getElementById('item-content-shipping__select').value) )
    }

    // por ultimo, se agrega al carrito y se descuenta en el inventario
    dispatch(addToCartState(_item))
    //console.log('se agrego al carrito')

  } else if (item.type==='models') {

    // si es models, se verifica que se haya seleccionado todos los atributos disponibles
    const selectModel = document.getElementById('item-content-attributes__model').value
    if (selectModel==='') {
      M.toast({html: strings.errorModelEmpty})
      return null
    }
    //
    // de haber seleccionado los atributos, se verifica su disponibilidad
    const wantedOption = [selectModel]
    let selectedOption = null
    for ( let i=0 ; i<item.variations.length ; i++ ) {
        //console.log('item.variations')
        //console.log(item.variations)
      if ( item.variations[i].attributes[0]===wantedOption[0] ) {
        selectedOption = item.variations[i]
        //console.log('selectedOption')
        //console.log(selectedOption)
        //i = item.variations.length  //
        break
      }
    }

    if (selectedOption === null || selectedOption.stock < 1) {
      M.toast({html: strings.errorNoStock})
      return null
    }

    //
    // de haber disponibilidad, se verifica que la cantidad que se solicita sea valida
    const amount = document.getElementById('item-content__addToCart__amount').value
    if (amount<1) {
      M.toast({html: strings.errorAmount})
      return null
    }
    //
    // y no sobrepase a lo disponible
    if ( (selectedOption.stock-amount) < 0 ) {
      M.toast({html: strings.errorNegativeStock})
      return null
    }

    const _item = {
      "id":item.id,
      "type":item.type,
      "shortTitle":item.shortTitle,
      "picture":item.pictures[0],
      "currency":item.currency,
      "symbol":item.symbol,
      "price":item.price,
      "amount": Number(amount),
      "attributes":selectedOption.attributes,
      "shipping": (item.shipping.length===0) ? ({ "currency":"", "symbol":"", "price":Number(0)}) : ( JSON.parse(document.getElementById('item-content-shipping__select').value) )
    }

    // por ultimo, se agrega al carrito y se descuenta en el inventario
    dispatch(addToCartState(_item))
    //console.log('se agrego al carrito')

  } else {
    // si es item type

    if (item.stock < 1) {
      M.toast({html: strings.errorItemNoStock})
      return null
    }

    //
    // de haber disponibilidad, se verifica que la cantidad que se solicita sea valida
    const amount = document.getElementById('item-content__addToCart__amount').value
    if (amount<1) {
      M.toast({html: strings.errorAmount})
      return null
    }
    //
    // y no sobrepase a lo disponible
    if ( (item.stock-amount) < 0 ) {
      M.toast({html: strings.errorNegativeStock})
      return null
    }

    const _item = {
      "id":item.id,
      "type":item.type,
      "shortTitle":item.shortTitle,
      "picture":item.pictures[0],
      "currency":item.currency,
      "symbol":item.symbol,
      "price":item.price,
      "amount": Number(amount),
      "attributes":[],
      "shipping": (item.shipping.length===0) ? ({ "currency":"", "symbol":"", "price":Number(0)}) : ( JSON.parse(document.getElementById('item-content-shipping__select').value) )
    }

    // por ultimo, se agrega al carrito y se descuenta en el inventario
    dispatch(addToCartState(_item))
    //console.log('se agrego al carrito')
  }

}
