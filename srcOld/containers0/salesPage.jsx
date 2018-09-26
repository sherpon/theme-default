import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Strings from '../strings'
import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { loadSalesList } from '../actions/store'
import { goToPage } from '../actions/pagination'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import Pagination from '../components/pagination/pagination'
import Sale from '../components/sale'

class SalesPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadSalesList } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadSalesList()
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
        <Sale.List
          username={username}
          list={pagination.page}
          strings={strings.list}
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
          child={strings.breadcrumbSales}
          onClick={ ()=> true }
          disabledChild={true}
        />
        {paginationComp}
        {purchasesListComp}
        {paginationComp}
      </section>
    )

  }
}

SalesPage.propsType = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadSalesList: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).pages.sales,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  isFetching: state.isFetching,
  pagination: {
    index: state.pagination.index,
    page: state.pagination.currentPage,
    pagesCount: state.pagination.pagesCount,
    itemsCount: state.pagination.itemsCount
  }
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  loadSalesList: () => dispatch(loadSalesList()),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(SalesPage))
