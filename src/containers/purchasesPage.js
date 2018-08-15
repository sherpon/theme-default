import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Strings from '../strings'
import session from '../models/session'
import { loadPurchasesList } from '../actions/account'
import { goToPage } from '../actions/pagination'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import Pagination from '../components/pagination/pagination'
import PurchasesList from '../components/purchasesList/purchasesList'

class PurchasesPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, loadPurchasesList } = this.props
    analytics()
    facebookPixel()
    loadPurchasesList()
  }

  render() {
    const { strings, username, isFetching, pagination, goToPage } = this.props

    if ( !session.inUserSession() ) {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

    let purchasesListComp, paginationComp

    if (isFetching) {
      purchasesListComp = (<div/>)
      paginationComp = (<div/>)
    } else {
      purchasesListComp = (
        <PurchasesList
          username={username}
          list={pagination.page}
          strings={strings}
        />
      )
      paginationComp = (
        <Pagination
          index={pagination.index}
          pages={pagination.pagesCount}
          onClick={goToPage}
        />
      )
    }

    return (
      <section>
        <Breadcrumbs
          username={username}
          home={strings.breadcrumbHome}
          route="/purchases"
          parent={null}
          child={strings.breadcrumbPurchases}
          onClick={ ()=> true }
          disabledChild={true}
        />
        {purchasesListComp}
        {paginationComp}
      </section>
    )

  }
}

PurchasesPage.propsType = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadPurchasesList: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).purchasesPage,
  username: state.store.username,
  isFetching: state.isFetching,
  pagination: {
    index: state.pagination.index,
    page: state.pagination.currentPage,
    pagesCount: state.pagination.pagesCount,
    itemsCount: state.pagination.itemsCount
  }
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {},
  loadPurchasesList: () => dispatch(loadPurchasesList()),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(PurchasesPage))
