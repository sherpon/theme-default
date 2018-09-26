import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login, signup } from '../actions/login'

import Strings from '../strings'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import LoginView from '../components/loginView/loginView'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { strings, basename, guest, mode, login, signup } = this.props

    return(
      <div className="login-page">
        <LoginView
          strings={strings}
          basename={basename}
          login={login}
          signup={signup}
          guest={guest}
          mode={mode}
        />
      </div>
    )
  }
}

LoginPage.propTypes = {
  strings: PropTypes.object.isRequired,
  basename: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  guest: PropTypes.bool,
  mode: PropTypes.string
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).loginPage,
  basename: `/${state.store.username}`,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  login: (email, password) => dispatch(login(email, password)),
  signup: (name, lastname, phone, email, password) => dispatch(signup(name, lastname, phone, email, password))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(LoginPage))
