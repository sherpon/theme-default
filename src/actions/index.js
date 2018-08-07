import * as types from '../constants/ActionTypes'
import codes from '../constants/codes.json'
import session from '../models/session'
import Strings from '../strings'
import history from '../models/history'
import { getEnv } from '../config'
import { sortCategories } from '../models/tools'
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

const _loadStore = () => (
  {
    type: types.LOAD_STORE,
    store: _store // window._store
  }
)

export const loadStore = () => (dispatch) => {
  sortCategories( () => dispatch(_loadStore()) ) // primero ordena las categorias y luego guarda al storeState
}

export const search = (event) => (dispatch, getState) => {
  if (event.key === 'Enter') {
    //dispatch(startFetching())
    const { storeState } = getState()
    const tag = document.getElementById('search-input').value
    fbq('track', 'Search', {search_string: tag})
    // window.location.href = getEnv().ENDPOINT + storeState.username + '/search/?search=' + tag.split(" ").join("_")
    // history.push( storeState.username + '/search/?search=' + tag.split(" ").join("_") )
    history.push({
      pathname: "/" + storeState.username + '/search',
      search: "?search=" + tag,  //  search: "?search=" + tag.split(" ").join("_")
      state: { some: "state" }
    })
    
    document.getElementById('search-input').value = ""
  }
}

export const loadSearch = (search) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch(pushResultLoadedFalse())
  dispatch(clearPagination())
  const { storeState } = getState()
  getItemsBySearch(storeState.id, search, (result) => {
    //console.log('result is %s', result) // ================================================>> debug
    const itemsByPage = 30 // cantidad de items por pagina
    const itemsCount = result.length // cantidad de items totales
    let pages = []
    const pagesCount = Math.ceil(itemsCount/itemsByPage)

    for (let i=0;i<pagesCount;i++) {
      const tmpPage = result.slice(i*itemsByPage, (i*itemsByPage)+itemsByPage)
      pages.push(tmpPage)
    }
    dispatch(savePagination(pagesCount, pages[0], pages, itemsCount))

    //dispatch(saveResult(result))
    dispatch(pushResultLoadedTrue())
    dispatch(stopFetching())
  })
}

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
  const { storeState } = getState()
  getItemsByCategory(storeState.id, category, (result) => {
    const itemsByPage = 30 // cantidad de items por pagina
    const itemsCount = result.length // cantidad de items totales
    let pages = []
    const pagesCount = Math.ceil(itemsCount/itemsByPage)

    for (let i=0;i<pagesCount;i++) {
      const tmpPage = result.slice(i*itemsByPage, (i*itemsByPage)+itemsByPage)
      pages.push(tmpPage)
    }
    dispatch(savePagination(pagesCount, pages[0], pages, itemsCount))

    //dispatch(saveResult(result))
    dispatch(pushResultLoadedTrue())
    dispatch(stopFetching())
  })
}
