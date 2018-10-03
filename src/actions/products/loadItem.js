import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import { getItemById } from '../../api/product'
import { getEnv } from '../../config'
import session from '../../models/session'

const _strings = {
  ES: require('./strings/loadItem.ES.json'),
  EN: require('./strings/loadItem.EN.json')
}

const clearItem = () => ({
  type: types.CLEAR_ITEM
})

const saveItem = (product) => ({
  type: types.SAVE_ITEM,
  product
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
  const strings = _strings[getState().language]
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
        mProduct['warning'] = strings.errorItemNoStock
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
  const strings = _strings[getState().language]
  //const { item } = getState()
  const { product } = getState()
  const item = product // temporal hasta refactorizar todo el codigo
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
        dispatch(setWarning(strings.errorNoStock))
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
        dispatch(setWarning(strings.errorNoStock))
      } else {
        dispatch(updatePrice(selectedOption.currency, selectedOption.symbol, selectedOption.price))
        dispatch(setWarning(''))
      }
    }
  } else {
    // item type...
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
