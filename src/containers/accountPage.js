import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Strings from '../strings'
import session from '../models/session'
import { updateAccount, updatePassword } from '../actions/account'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import AccountView from '../components/accountView/accountView'

class AccountPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel } = this.props
    analytics()
    facebookPixel()
  }

  render() {
    const { strings, username, user, updateAccount, updatePassword } = this.props

    if ( session.inUserSession() ) {
      return (
        <section>
          <Breadcrumbs
            username={username}
            home={strings.breadcrumbHome}
            route="/account"
            parent={null}
            child={strings.breadcrumbAccount}
            onClick={ ()=> true }
            disabledChild={true}
          />
          <AccountView
            strings={strings}
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
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).accountPage,
  username: state.store.username,
  user: session.getUser()
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {},
  updateAccount: (name, lastname, phone, email) => dispatch(updateAccount(name, lastname, phone, email)),
  updatePassword: (password1, password2) => dispatch(updatePassword(password1, password2))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(AccountPage))
