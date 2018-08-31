import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Strings from '../strings'
import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { loadProductsList } from '../actions/store'
import { goToPage } from '../actions/pagination'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import Pagination from '../components/pagination/pagination'
import ProductsList from '../components/productsList/productsList.jsx'

class ProductsPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadProductsList } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadProductsList()
  }

  render() {
    const { strings, username, isFetching, pagination, goToPage } = this.props

    if ( !session.inUserSession() ) {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

    let productsListComp, paginationComp

    if (isFetching) {
      productsListComp = (<div/>)
      paginationComp = (<div/>)
    } else {
      productsListComp = (
        <ProductsList
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
          route="/products"
          parent={null}
          child={strings.breadcrumbProducts}
          onClick={ ()=> true }
          disabledChild={true}
        />
        {paginationComp}
        {productsListComp}
        {paginationComp}
      </section>
    )

  }
}

ProductsPage.propsType = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadProductsList: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).pages.products,
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
  loadProductsList: () => dispatch(loadProductsList()),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ProductsPage))
