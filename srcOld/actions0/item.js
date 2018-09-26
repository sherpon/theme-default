import * as types from '../constants/ActionTypes'
import { startFetching, stopFetching } from './fetching'
import { getItemById } from '../api/item'
import { getEnv } from '../config'
import Strings from '../strings'
import history from '../models/history'
import session from '../models/session'

const clearItem = () => ({
  type: types.CLEAR_ITEM
})

const saveItem = (item) => ({
  type: types.SAVE_ITEM,
  item
})

const isInCart = (item, cart) => {
  for ( let i=0 ; i < cart.items.length ; i++ ) {
    // cart.items.map( (_item) => {
    let _item = cart.items[i]
    if ( item.id === _item.id ) {
      // si es el mismo articulo, actualiza el stock disponible. resta la cantidad en el carrito en el stock del item
      if ( item.type === 'item' ) {
        item.stock -= _item.amount
        return item
      } else if ( item.type === 'models' ) {
        item.variations.map( (variation, i) => {
          if (variation.attributes[0] ===_item.attributes[0]) {
            variation.stock -= _item.amount
            item.variations[i] = variation
            return item
          }
        } )
        //return (item.stock - _item.amount)
      } else if ( item.type === 'clothes' ) {
        item.variations.map( (variation, i) => {
          if (variation.attributes[0] ===_item.attributes[0] && variation.attributes[1] ===_item.attributes[1]) {
            variation.stock -= _item.amount
            item.variations[i] = variation
            return item
          }
        } )
        //return (item.stock - _item.amount)
      }
    }
  }
  return item
}

export const loadItem = (itemId) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch(clearItem())
  const { store } = getState()
  getItemById(store.id, itemId, (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    let mProduct = result.product
    mProduct['warning'] = ''
    mProduct = isInCart(mProduct, getState().cart)
    if ( mProduct.stock !== undefined ) {
      if ( mProduct.stock < 1 ) {
        mProduct['warning'] = Strings(getState().language).itemPage.errorItemNoStock
      }
    }

    dispatch(saveItem(mProduct))
    dispatch(stopFetching())
  })
}

const setWarning = (warning) => ({
  type: types.SET_WARNING,
  warning
})

const updatePrice = (currency, symbol, price) => ({
  type: types.UPDATE_PRICE,
  currency,
  symbol,
  price
})

export const onChangedSelect = () => (dispatch, getState) => {
  const { item } = getState()
  if (item.type==='clothes') {
    const selectSize = document.getElementById('item-content-attributes__size').value
    const selectColor = document.getElementById('item-content-attributes__color').value
    if (selectSize!=='' && selectColor!=='') {
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
        dispatch(setWarning(Strings(getState().language).itemPage.errorNoStock))
      } else {
        dispatch(updatePrice(selectedOption.currency, selectedOption.symbol, selectedOption.price))
        dispatch(setWarning(''))
      }
    }
  } else if (item.type==='models') {
    const selectModel = document.getElementById('item-content-attributes__model').value
    if (selectModel!=='') {
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
        dispatch(setWarning(Strings(getState().language).itemPage.errorNoStock))
      } else {
        dispatch(updatePrice(selectedOption.currency, selectedOption.symbol, selectedOption.price))
        dispatch(setWarning(''))
      }
    }
  } else {
    // item type...
  }
}

const goToCart = (storeId, cart, username) => {
  session.setCart( storeId, cart )
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

    return goToCart(getState().store.id, getState().cart, getState().store.username)
  }
}

export const addToCart = () => (dispatch, getState) => {
  const { item } = getState()

  // se verifica que haya metodo de envio
  if (item.shipping.length===0) {
    // no hay metodo de envio
  } else {
    // si lo hay, que se haya seleccionado uno
    const selectShipping = document.getElementById('item-content-shipping__select').value
    if (selectShipping==='') {
      M.toast({html: Strings(getState().language).itemPage.errorShippingEmpty})
      return null
    }
  }
  //
  // se verifica el tipo de item
  if (item.type==='clothes') {
    // si es clothes, se verifica que se haya seleccionado todos los atributos disponibles
    const selectSize = document.getElementById('item-content-attributes__size').value
    if (selectSize==='') {
      M.toast({html: Strings(getState().language).itemPage.errorSizeEmpty})
      return null
    }
    const selectColor = document.getElementById('item-content-attributes__color').value
    if (selectColor==='') {
      M.toast({html: Strings(getState().language).itemPage.errorColorEmpty})
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
      M.toast({html: Strings(getState().language).itemPage.errorNoStock})
      return null
    }

    //
    // de haber disponibilidad, se verifica que la cantidad que se solicita sea valida
    const amount = document.getElementById('item-content__addToCart__amount').value
    if (amount<1) {
      M.toast({html: Strings(getState().language).itemPage.errorAmount})
      return null
    }
    //
    // y no sobrepase a lo disponible
    if ( (selectedOption.stock-amount) < 0 ) {
      M.toast({html: Strings(getState().language).itemPage.errorNegativeStock})
      return null
    }

    const _item = {
      "id":item.id,
      "type":item.type,
      "shortTitle":item.shortTitle,
      "picture":item.picture1,
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
      M.toast({html: Strings(getState().language).itemPage.errorModelEmpty})
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
      M.toast({html: Strings(getState().language).itemPage.errorNoStock})
      return null
    }

    //
    // de haber disponibilidad, se verifica que la cantidad que se solicita sea valida
    const amount = document.getElementById('item-content__addToCart__amount').value
    if (amount<1) {
      M.toast({html: Strings(getState().language).itemPage.errorAmount})
      return null
    }
    //
    // y no sobrepase a lo disponible
    if ( (selectedOption.stock-amount) < 0 ) {
      M.toast({html: Strings(getState().language).itemPage.errorNegativeStock})
      return null
    }

    const _item = {
      "id":item.id,
      "type":item.type,
      "shortTitle":item.shortTitle,
      "picture":item.picture1,
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
      M.toast({html: Strings(getState().language).itemPage.errorItemNoStock})
      return null
    }

    //
    // de haber disponibilidad, se verifica que la cantidad que se solicita sea valida
    const amount = document.getElementById('item-content__addToCart__amount').value
    if (amount<1) {
      M.toast({html: Strings(getState().language).itemPage.errorAmount})
      return null
    }
    //
    // y no sobrepase a lo disponible
    if ( (item.stock-amount) < 0 ) {
      M.toast({html: Strings(getState().language).itemPage.errorNegativeStock})
      return null
    }

    const _item = {
      "id":item.id,
      "type":item.type,
      "shortTitle":item.shortTitle,
      "picture":item.picture1,
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

export const facebookInit = () => {
  window.fbAsyncInit = function() {
    FB.init({
      appId            : getEnv().APP_ID_FACEBOOK,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.0'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

export const shareFacebook = () => {
  /*ReactGA.event({
    category: 'Item',
    action: 'shareItemFacebook',
    label: 'facebook_link'
  });*/

  // Custom event (can only be used for audience building)
  //fbq('trackCustom', 'shareItemFacebook', {label: 'facebook_link'});

  FB.ui({
    method: 'share',
    //display: 'popup',
    mobile_iframe: true,
    href: window.location.href + "?utm_source=sherpon_store&utm_medium=facebook_link&utm_campaign=social_shared_item",
  }, function(response){
    //
  });
}

export const shareWhatsapp = () => {
  /*ReactGA.event({
    category: 'Item',
    action: 'shareItemWhatsapp',
    label: 'whatsapp_link',
    transport: 'beacon' // para que siga el seguimiento despues que vaya a wapp
  });*/

  // Custom event (can only be used for audience building)
  //fbq('trackCustom', 'shareItemWhatsapp', {label: 'whatsapp_link'});

  window.location.href = "https://api.whatsapp.com/send?text=" + window.location.href + "?utm_source%3Dsherpon_store%26utm_medium%3Dwhatsapp_link%26utm_campaign%3Dsocial_shared_item"
}
