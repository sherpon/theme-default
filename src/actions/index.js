import * as types from '../constants/ActionTypes'
import codes from '../constants/codes.json'
import session from '../models/session'
import Strings from '../strings'
import history from '../models/history'
import { getEnv } from '../config'
import { sortCategories, noLinkEspace } from '../models/tools'
import { getItemsByCategory, getItemsBySearch } from '../api/item'

const startFetching = () => (
  {
    type: types.FETCH_START
  }
)

const stopFetching = () => (
  {
    type: types.FETCH_STOP
  }
)



export const pushResultLoadedTrue = () => (
  {
    type: types.RESULT_IS_LOADED
  }
)

export const pushResultLoadedFalse = () => (
  {
    type: types.RESULT_IS_NOT_LOADED
  }
)

const clearResult = () => ({

})

const saveResult = (result) => (
  {
    type: types.SAVE_RESULT,
    result
  }
)

const clearPagination = () => (
  {
    type: types.CLEAR_PAGINATION
  }
)

const savePagination = (pagesCount, currentPage, pages, itemsCount) => (
  {
    type: types.SAVE_PAGINATION,
    pagination: {
      index:0,
      itemsCount,
      pagesCount,
      currentPage,
      pages
    }
  }
)

export const goToPage = (index) => ({
  type: types.GO_TO_PAGE,
  goTo: index
})

export const loadCategory = (category) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch(pushResultLoadedFalse())
  dispatch(clearPagination())
  const { store } = getState()
  getItemsByCategory(store.id, category.toLowerCase(), (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    const productsList = result.products
    const itemsByPage = 30 // cantidad de items por pagina
    const itemsCount = productsList.length // cantidad de items totales
    let pages = []
    const pagesCount = Math.ceil(itemsCount/itemsByPage)

    for (let i=0;i<pagesCount;i++) {
      const tmpPage = productsList.slice(i*itemsByPage, (i*itemsByPage)+itemsByPage)
      pages.push(tmpPage)
    }
    dispatch(savePagination(pagesCount, pages[0], pages, itemsCount))

    //dispatch(saveResult(productsList))
    dispatch(pushResultLoadedTrue())
    dispatch(stopFetching())
  })
}
