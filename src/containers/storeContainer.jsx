import React from 'react'
import {  withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/** actions */
import { editStoreSwitch } from '../actions/store/store'
import { loadStore } from '../actions/store/loadStore'
import { search } from '../actions/store/search'
import { logout } from '../actions/user/session'

/** models */
import session from '../models/session'

/** components */
import Spinner from '../components/spinner/spinner.jsx'
import Navbar from '../components/navbar/navbar.jsx'
import Header from '../components/header/header.jsx'
import Tabs from '../components/tabs/tabs.jsx'
import Footer from '../components/footer/footer.jsx'
import Jordi from '../components/jordi/jordi.jsx'

/** containers */
import ContactContainer from './contactContainer.jsx'
import ViewportContainer from './viewport.jsx'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    const { loadStore } = this.props
    loadStore()
  }

  render() {
    const { isFetching } = this.props /** spinner */
    const { language, inSession, isAdmin, isEditable, editStoreSwitch, search, user, username, logout } = this.props /** navbar */

    return (
      <div>
        <Spinner
          isFetching={isFetching}
        />
        <Navbar
          language={language}
          inSession={inSession}
          isAdmin={isAdmin}
          isEditable={isEditable}
          editStoreSwitch={editStoreSwitch}
          search={search}
          user={user}
          username={username}
          logout={logout}
        />
        <Header/>
        <Tabs/>
        <ViewportContainer/>
        <ContactContainer/>
        <Footer
          language={language}
        />
      {/*<Jordi/>*/}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  language: state.language,
  isFetching: state.isFetching,
  isEditable: state.isEditable,
  inSession: state.inSession,
  isAdmin: state.isAdmin,
  user: session.getUser(),
  username: state.store.username
})

const mapDispatchToProps = dispatch => ({
  loadStore: () => dispatch(loadStore()),
  search: (event) => dispatch(search(event)),
  editStoreSwitch: () => dispatch(editStoreSwitch()),
  logout: () => dispatch(logout())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(Store))
