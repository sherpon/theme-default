import * as types from '../constants/ActionTypes'
import { stopFetching } from './fetching'

export const clearPagination = () => (
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

export const setPages = (content, itemsByPage = 30) => (dispatch, getState) => {
  // const itemsByPage = 30 // cantidad de items por pagina
  const itemsCount = content.length // cantidad de items totales
  let pages = []
  const pagesCount = Math.ceil(itemsCount/itemsByPage)

  for (let i=0;i<pagesCount;i++) {
    const tmpPage = content.slice(i*itemsByPage, (i*itemsByPage)+itemsByPage)
    pages.push(tmpPage)
  }
  dispatch(savePagination(pagesCount, pages[0], pages, itemsCount))
  dispatch(stopFetching())
}

export const goToPage = (index) => ({
  type: types.GO_TO_PAGE,
  goTo: index
})
