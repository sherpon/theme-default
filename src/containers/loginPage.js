import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel } = this.props
    analytics()
    facebookPixel()
  }

  render() {
    const {  } = this.props

    return(
      <div/>
    )  
  }
}

LoginPage.propTypes = {
  //strings: PropTypes.object.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  //strings: Strings(state.language).loginPage
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {}
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(LoginPage))