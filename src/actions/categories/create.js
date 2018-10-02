import * as types from '../../constants/ActionTypes'
import { startFetching, stopFetching } from '../fetching'
import session from '../../models/session'
import {
  createCategoriesStore as apiCreateCategoriesStore
} from '../../api/category'

import httpStatusCodes from '../../constants/httpStatusCodes.json'

export const categoriesCreateButton = () => (dispatch, getState) => {
  const storeId = getState().store.id
  const userId = session.getUser().id
  const newCategoryName = document.getElementById('categories-modal__name').value
  const newCategoryOrder = document.getElementById('categories-modal__order').value
  const newCategoryType = document.querySelector('input[name="group1"]:checked').value
  const newCategoryParent = document.getElementById('categories-modal__parent').value

  const newCategory = {
    name: newCategoryName,
    order: (newCategoryOrder==='') ? ( 0 ) : ( parseInt(newCategoryOrder) ),
    type: newCategoryType,
    parent: newCategoryParent
  }

  dispatch(startFetching())

  apiCreateCategoriesStore(userId, storeId, newCategory, (status, response) => {
    // update local dataStore store state, then...

    if (status!==httpStatusCodes.CREATED) {
      // if there's an error...
      dispatch(stopFetching())
      // show an error message
      return false
    }

    const categoriesStore = getState().store.categories

    if ( newCategory.type === 'primary' ) {
      /** if is primary, push in the primary array */
      // falta ordenar...
      newCategory.children = []
      categoriesStore.push(newCategory)
    } else {
      /** if is secundary, push in the secundary array */
      // falta ordenar...
      for ( let i = 0 ; i < categoriesStore.length ; i++ ) {
        if (categoriesStore[i].name === newCategory.parent) {
          categoriesStore[i].children.push(newCategory)
        }
      }
    }

    dispatch({
      type: types.UPDATE_CATEGORIES_STORE,
      categoriesStore
    })
    dispatch(stopFetching())
  })

}
