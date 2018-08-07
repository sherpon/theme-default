import { connect } from 'react-redux'

//import { search } from '../actions'
import Strings from '../strings'

import Terms from '../components/terms/terms.js'

const mapStateToProps = state => ({
  strings: Strings(state.language).terms,
  isEditable: state.isEditable,
  terms: state.storeState.terms
})

const mapDispatchToProps = dispatch => ({
  init: () => {
    //$(document).ready(function(){
    //  $('.sidenav').sidenav()
    //})
  }
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(Terms)