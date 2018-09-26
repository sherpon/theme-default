/**
 * Create the pagination of the queries
 * @namespace paginations
 * @author Grover Lee
 */

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
/******************************************************************************/
/**
 * @function
 * @name setPages
 * @description Set the pagination of a list
 * @example
 * // set pagination by 30 items by page
 * setPages( array )
 * @example
 * // set pagination by 20 items by page
 * setPages( array, 20 )
 * @example
 * // Example of usage
 * apiLoadPurchasesList({ storeId, userId }, (_list) => {
 *   dispatch(setPages(_list, 30))
 * })
 * @fires fetching~stopFetching
 * @param {Object[]} content - array of objects to sort
 * @param {number} itemsByPage - Optional. Number of object by page
 * @author Grover Lee
 */
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
/******************************************************************************/

/******************************************************************************/
/**
 * @function
 * @name goToPage
 * @description change the content of the currentPage state
 * @example
 * // Go to the page 1
 * dispatch(goToPage(0))
 * @example
 * // Go to the page 5
 * dispatch(goToPage(4))
 * @param {number} index - the page's number
 * @author Grover Lee
 */
export const goToPage = (index) => ({
  type: types.GO_TO_PAGE,
  goTo: index
})
/******************************************************************************/
