import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { loadPurchasesList } from '../actions/sales/loadPurchasesList'
import { goToPage } from '../actions/pagination'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import Pagination from '../components/pagination/pagination.jsx'
import Sale from '../components/sale'

const _strings = {
  ES: {
    breadcrumbPurchases:'Mis compras'
  },
  EN: {
    breadcrumbPurchases:''
  }
}

class PurchasesPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadPurchasesList } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadPurchasesList()
  }

  render() {
    const { language, username, isFetching, pagination, goToPage } = this.props
    const strings = _strings[language]

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
        <Sale.PurchasesList
          username={username}
          list={pagination.page}
          language={language}
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
          language={language}
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
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadPurchasesList: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  //strings: Strings(state.language).purchasesPage,
  language: state.language,
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
  loadPurchasesList: () => dispatch(loadPurchasesList()),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(PurchasesPage))
