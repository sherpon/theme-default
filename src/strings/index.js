const Strings = (language) => {
  switch (language) {
    case 'EN':
      return require('./EN.json')
    case 'ES':
      return require('./ES.json')
    default:
      return require('./EN.json')
  }
}

export default Strings

/*
Notes
=====

var userLang = navigator.language || navigator.userLanguage; 
 */