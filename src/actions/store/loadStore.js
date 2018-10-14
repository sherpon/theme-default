import * as types from '../../constants/ActionTypes'

const sortArrayCategory = (category) => {
  for (var i=0;i<category.length-1;i++) {
    for (var j=i+1;j<category.length;j++) {
      if (category[j].order<category[i].order) {
        let tmp = category[i]
        category[i] = category[j]
        category[j] = tmp
      }
    }
  }
  return category
}

const sortCategories = (callback) => {
  /** deja una lista de categorias para usarla despues para edicion */
  _store.categoriesList = _store.categories

  let primaryCategories = []
  let secundaryCategories = []

  _store.categories.map( category => {
    if (category.type==='primary') { primaryCategories.push(category) }
    else { secundaryCategories.push(category) }
  })
  // ordenar categorias primary
  primaryCategories = sortArrayCategory(primaryCategories)

  //agregar hijos a las categorias padres
  for (var i=0;i<primaryCategories.length;i++) {
    let tmpChildren = []
    for (var j=0;j<secundaryCategories.length;j++) {
      if (primaryCategories[i].name===secundaryCategories[j].parent) {
        tmpChildren.push(secundaryCategories[j])
      }
    }
    // se ordena las categorias secundarias de cada primaria
    tmpChildren = sortArrayCategory(tmpChildren)
    //se asigna los hijos
    primaryCategories[i].children = tmpChildren
  }

  _store.categories = primaryCategories
  callback()
}

const _loadStore = () => (
  {
    type: types.LOAD_STORE,
    store: _store // window._store
  }
)

export const loadStore = () => (dispatch) => {
  sortCategories( () => dispatch(_loadStore()) ) // primero ordena las categorias y luego guarda al store
}
