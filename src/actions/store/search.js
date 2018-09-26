import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import { clearPagination, setPages } from '../pagination'
import history from '../../models/history'
import { noLinkEspace } from '../../models/tools'

export const search = (event) => (dispatch, getState) => {
  if (event.key === 'Enter') {
    //dispatch(startFetching())
    const { store } = getState()
    const tag = document.getElementById('search-input').value
    fbq('track', 'Search', {search_string: tag})
    // window.location.href = getEnv().ENDPOINT + store.username + '/search/?search=' + tag.split(" ").join("_")
    // history.push( store.username + '/search/?search=' + tag.split(" ").join("_") )
    document.getElementById('search-input').value = ""
    history.push({
      pathname: "/" + store.username + '/search',
      search: "?search=" + noLinkEspace(tag),  //  search: "?search=" + tag.split(" ").join("_")
      state: { some: "state" }
    })
  }
}

export const loadSearch = (search) => (dispatch, getState) => {
  dispatch(startFetching())
  dispatch(clearPagination())
  const { store } = getState()
  getItemsBySearch(store.id, search.toLowerCase(), (result) => {
    if (result.error !== null) {
      /** show error message */
      dispatch(stopFetching())
    }
    const productsList = result.products
    dispatch(setPages(productsList, 30))
  })
}
