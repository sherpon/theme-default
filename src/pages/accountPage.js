import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { updateAccount, updatePassword } from '../actions/user/update'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import AccountView from '../components/accountView/accountView.jsx'

const strings = {
  ES: {
    breadcrumbAccount:'Mi cuenta'
  },
  EN: {
    breadcrumbAccount:''
  }
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { language, username, user, updateAccount, updatePassword } = this.props

    if ( session.inUserSession() ) {
      return (
        <section>
          <Breadcrumbs
            username={username}
            language={language}
            route="/account"
            parent={null}
            child={strings[language].breadcrumbAccount}
            onClick={ ()=> true }
            disabledChild={true}
          />
          <AccountView
            language={language}
            user={user}
            updateAccount={updateAccount}
            updatePassword={updatePassword}
          />
        </section>
      )
    } else {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

  }
}

AccountPage.propsType = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  //strings: Strings(state.language).accountPage,
  language: state.language,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  user: session.getUser()
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  updateAccount: (name, lastname, phone, email) => dispatch(updateAccount(name, lastname, phone, email)),
  updatePassword: (password1, password2) => dispatch(updatePassword(password1, password2))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(AccountPage))
