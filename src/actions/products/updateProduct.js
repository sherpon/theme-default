import * as types from '../../constants/ActionTypes'
import httpStatusCodes from '../../constants/httpStatusCodes.json'
import { startFetching, stopFetching } from '../fetching'
//import { clearPagination, setPages } from '../pagination'
//import { getProducts as apiGetProducts } from '../../api/product'
import session from '../../models/session'
import history from '../../models/history'
import { getRandomString } from '../../models/tools'

import { uploadImageStore as apiUploadImageStore } from '../../api/store'
import { updateProduct as apiUpdateProduct } from '../../api/product'

const _strings = {
  ES:require('./strings/createNewProduct.ES.json'),
  EN:require('./strings/createNewProduct.EN.json')
}

/******************************************************************************/
/**
 * @function
 * @name updateProduct
 * @description Create store's new product
 * // where's this function used?
 * // - src/containers/productsPage.jsx
 */
export const updateProduct = (productId) => (dispatch, getState) => {
  //debugger
  const strings = _strings[getState().language]
  const userId = session.getUser().id
  const storeId = getState().store.id

  let newProduct = {
    type: 'item',  // default item
    shortTitle: '',
    longTitle: '',
    tags: [],  // default empty
    categories: [],
    description: '',
    include: '',
    characteristics: '',
    currency: '',
    symbol: '',
    price: 0,
    stock: 0,
    //shipping: [],
    attributes: [],
    variations: [],
    pictures: []
  }

  const inputPicture1 = document.getElementById('product-editor-pictures__picture-1')
  const inputPicture2 = document.getElementById('product-editor-pictures__picture-2')
  const inputPicture3 = document.getElementById('product-editor-pictures__picture-3')
  const inputPicture4 = document.getElementById('product-editor-pictures__picture-4')
  const inputPicture5 = document.getElementById('product-editor-pictures__picture-5')
  const inputPicture6 = document.getElementById('product-editor-pictures__picture-6')
  const inputPicture7 = document.getElementById('product-editor-pictures__picture-7')

  const tmpCategoriesStr = document.getElementById('product-editor-category__category').value
  if ( tmpCategoriesStr === '[]' ) {
    M.toast({html: strings.errorCategory})
    return false
  }

  const tmpPriceCurrencyStr = document.getElementById('product-editor-price__currency').value
  if ( tmpPriceCurrencyStr === '{}' ) {
    M.toast({html: strings.errorPriceCurrency})
    return false
  }

  /*const tmpShippingCurrencyStr = document.getElementById('product-editor-shipping__currency').value
  if ( tmpShippingCurrencyStr === '{}' ) {
    M.toast({html: strings.errorShippingCurrency})
    return false
  }*/

  const uploadPicture1 = () => {

    if (!inputPicture1.files[0]) {
      if (getState().product.pictures[0]===undefined) {
        uploadPicture2() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[0])
        uploadPicture2() /** next ... */
      }

    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture1.files[0], fileName, storeId, (downloadURL) => {
        newProduct.pictures.push(downloadURL)
        uploadPicture2() /** next ... */
      })
    }
  }

  const uploadPicture2 = () => {

    if (!inputPicture2.files[0]) {
      if (getState().product.pictures[1]===undefined) {
        uploadPicture3() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[1])
        uploadPicture3() /** next ... */
      }
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture2.files[0], fileName, storeId, (downloadURL) => {
        //newProduct.picture2 = downloadURL
        newProduct.pictures.push(downloadURL)
        uploadPicture3() /** next ... */
      })
    }
  }

  const uploadPicture3 = () => {

    if (!inputPicture3.files[0]) {
      if (getState().product.pictures[2]===undefined) {
        uploadPicture4() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[2])
        uploadPicture4() /** next ... */
      }
    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture3.files[0], fileName, storeId, (downloadURL) => {
        //newProduct.picture3 = downloadURL
        newProduct.pictures.push(downloadURL)
        uploadPicture4() /** next ... */
      })
    }
  }

  const uploadPicture4 = () => {

    if (!inputPicture4.files[0]) {
      if (getState().product.pictures[3]===undefined) {
        uploadPicture5() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[3])
        uploadPicture5() /** next ... */
      }

    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture4.files[0], fileName, storeId, (downloadURL) => {
        //newProduct.picture4 = downloadURL
        newProduct.pictures.push(downloadURL)
        uploadPicture5() /** next ... */
      })
    }
  }

  const uploadPicture5 = () => {

    if (!inputPicture5.files[0]) {
      if (getState().product.pictures[4]===undefined) {
        uploadPicture6() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[4])
        uploadPicture6() /** next ... */
      }

    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture5.files[0], fileName, storeId, (downloadURL) => {
        //newProduct.picture5 = downloadURL
        newProduct.pictures.push(downloadURL)
        uploadPicture6() /** next ... */
      })
    }
  }

  const uploadPicture6 = () => {

    if (!inputPicture6.files[0]) {
      if (getState().product.pictures[5]===undefined) {
        uploadPicture7() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[5])
        uploadPicture7() /** next ... */
      }

    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture6.files[0], fileName, storeId, (downloadURL) => {
        //newProduct.picture6 = downloadURL
        newProduct.pictures.push(downloadURL)
        uploadPicture7() /** next ... */
      })
    }
  }

  const uploadPicture7 = () => {

    if (!inputPicture7.files[0]) {
      if (getState().product.pictures[6]===undefined) {
        next() /** next ... */
      } else {
        newProduct.pictures.push(getState().product.pictures[6])
        next() /** next ... */
      }

    } else {
      const timestamp = (new Date()).getTime()
      const fileName = storeId + '_' + timestamp + '_' + getRandomString(5)
      apiUploadImageStore(inputPicture7.files[0], fileName, storeId, (downloadURL) => {
        //newProduct.picture7 = downloadURL
        newProduct.pictures.push(downloadURL)
        next() /** next ... */
      })
    }
  }

  const next = () => {
    newProduct.shortTitle = document.getElementById('product-editor-information__shortTitle').value
    newProduct.longTitle = document.getElementById('product-editor-information__longTitle').value
    //tags: [],  // default empty

    const tmpCategories = JSON.parse( tmpCategoriesStr )  // give the category object
    /*newProduct.categories = [
      tmpCategories
    ]*/
    newProduct.categories = tmpCategories

    newProduct.description = document.getElementById('product-editor-information__description').value
    newProduct.include = document.getElementById('product-editor-information__include').value
    newProduct.characteristics = document.getElementById('product-editor-information__characteristics').value

    newProduct.currency = JSON.parse(tmpPriceCurrencyStr).currency
    newProduct.symbol = JSON.parse(tmpPriceCurrencyStr).symbol

    newProduct.price = document.getElementById('product-editor-price__amount').value
    newProduct.stock = document.getElementById('product-editor-information__stock').value
    /** temporaly, allow just one option of shipping */
    /*newProduct.shipping = [
      {
        description: '',
  			currency: JSON.parse(tmpShippingCurrencyStr).currency,
  			symbol: JSON.parse(tmpShippingCurrencyStr).symbol,
  			price: document.getElementById('product-editor-shipping__price').value,
  			days: document.getElementById('product-editor-shipping__time').value,
      }
    ]*/
    //attributes: [],
    //variations: [],
    apiUpdateProduct( userId, storeId, productId, newProduct, (status, result) => {
      if (status!==httpStatusCodes.OK) {
        /** show error message */
        dispatch(stopFetching())
      }
      //dispatch(setPages(result.products, 30))
      dispatch(stopFetching())
      history.replace({
        pathname: "/" + getState().store.username + '/products',
        state: { some: "state" }
      })
    })
  }

  dispatch(startFetching())
  /** start creating the new product */
  uploadPicture1()

}
/******************************************************************************/
