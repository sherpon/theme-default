import {
  SAVE_PAGINATION,
  CLEAR_PAGINATION,
  GO_TO_PAGE
} from '../constants/ActionTypes'

const initStatePagination = {
  index:0,
  pagesCount:0,
  itemsCount:0,
  currentPage:[],
  pages:[]
}

const pagination = (state = initStatePagination, action) => {
  switch (action.type) {
    case SAVE_PAGINATION:
      if (action.pagination.itemsCount===0) {
        return initStatePagination
      } else {
        return action.pagination
      }
    case GO_TO_PAGE:
      return {
        pages:state.pages,
        pagesCount:state.pagesCount,
        itemsCount:state.itemsCount,
        currentPage:state.pages[action.goTo],
        index:action.goTo
      }
    case CLEAR_PAGINATION:
      return initStatePagination
    default:
      return state
  }
}

export default pagination