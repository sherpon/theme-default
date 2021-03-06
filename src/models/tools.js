/**
 * @namespace tool
 * @author Grover Lee
 */

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

export const sortCategories = (callback) => {
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

export const noLinkEspace = (link) => link.split(" ").join("_")

export const cleanLink = (link) => noLinkEspace(link)

export const noLinkUnderscore = (link) => link.split("_").join(" ")

export const getPriceFormat = (mPrice) => {
  mPrice = Math.round(mPrice * 100) / 100
  var rPrice = mPrice.toString()
  var dotPosition = rPrice.indexOf('.')
//console.log('dotPosition', dotPosition)
  var lengthPrice = rPrice.length
//console.log('lengthPrice', lengthPrice)
  var decimals = lengthPrice - dotPosition
  if (dotPosition===-1) { rPrice = rPrice + '.00' }
  if (dotPosition!==-1 && decimals===2) { rPrice = rPrice + '0' }
  if (dotPosition!==-1 && decimals===3) { rPrice = rPrice + '' }
  return rPrice
}

export const getQueryValue = (query) => {
  //console.log('Query is %s', query)
  var _query = window.location.search.substring(1)
  var vars = _query.split('&')
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      //console.log('decodeURIComponent(pair[0]) is %s', decodeURIComponent(pair[0]))
      //console.log('decodeURIComponent(pair[1]) is %s', decodeURIComponent(pair[1]))
      if (decodeURIComponent(pair[0]) == query) {
          return decodeURIComponent(pair[1])
      }
  }
  //console.log('Query %s not found', query)
  return ""
}

export const json2array = (json) => {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
    result.push(json[key]);
  });
  return result;
}

/******************************************************************************/
/**
 * @function
 * @name getFormattedTime
 * @description get the formatted time from a timestamp
 *
 * @param {number} timestamp - unix timestamp of 13 digits
 * @return {string} formatted time. E.g. 2018/12/30
 * @author Grover Lee
 */
export const getFormattedTime = (timestamp) => {
  const date = new Date(timestamp);
  // Hours part from the timestamp
  const year = date.getFullYear()
  // Minutes part from the timestamp
  const month = "0" + (date.getMonth()+1)
  // Seconds part from the timestamp
  const day = "0" + date.getDate()

  // Will display time in 10:30:23 format
  const formattedTime = year + '/' + month.substr(-2) + '/' + day.substr(-2)
  return formattedTime
}
/******************************************************************************/


export const getRandomString = (length = 30) => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
