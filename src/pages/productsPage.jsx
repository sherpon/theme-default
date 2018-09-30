import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Strings from '../strings'
import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { loadProductsList } from '../actions/products/loadProductsList'
import { goToPage } from '../actions/pagination'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import Pagination from '../components/pagination/pagination.jsx'
import Product from '../components/product'
//import ProductsList from '../components/productsList/productsList.jsx'

const strings = {
  ES: {
    breadcrumbProducts:'Mis productos'
  },
  EN: {
    breadcrumbProducts:''
  }
}

class ProductsPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadProductsList } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadProductsList()
  }

  render() {
    const { language, username, isFetching, pagination, goToPage } = this.props

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
        <Product.List
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
          route="/products"
          parent={null}
          child={strings[language].breadcrumbProducts}
          onClick={ ()=> true }
          disabledChild={true}
        />
        <Product.CreatorButton
          username={username}
          language={language}
        />
        {productsListComp}
        {paginationComp}
      </section>
    )

  }
}

ProductsPage.propsType = {
  language: PropTypes.string.isRequired,
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
  loadProductsList: () => dispatch(loadProductsList()),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ProductsPage))
