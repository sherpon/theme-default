import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { goToPage } from '../actions/pagination'
import { loadCategory } from '../actions/categories/loadCategory'

import { noLinkUnderscore } from '../models/tools'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import Pagination from '../components/pagination/pagination.jsx'
import ResultCount from '../components/resultCount/resultCount.jsx'
import Product from '../components/product'
//import PreviewListPlaceholder from '../components/previewListPlaceholder/previewListPlaceholder'
//import PreviewList from '../components/previewList/previewList'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, category, loadCategory } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    const categoryArray = category.split("--")
    const categoryTitle = categoryArray[0]
    const categoryId = categoryArray[1]
    loadCategory(categoryId)
  }

  render () {
    const { isEditable, username, language, parent, category, isFetching, pagination, loadCategory, goToPage } = this.props
    const categoryArray = category.split("--")
    const categoryTitle = categoryArray[0]
    const categoryId = categoryArray[1]

    let child
    let resultCountComp
    let paginationComp
    let productCreatorButton

    if (isEditable) {
      productCreatorButton = (<Product.CreatorButton username={username} language={language} />)
    } else {
      productCreatorButton = (<div/>)
    }

    if (isFetching) {
      resultCountComp = (<div/>)
      paginationComp = (<Pagination index={pagination.index} pages={pagination.pagesCount} onClick={goToPage}/>)
      child = (<Product.PreviewListPlaceholder/>)
    } else {
      if ( pagination.itemsCount === 0 ) {
        resultCountComp = (<ResultCount itemsCount={pagination.itemsCount} language={language} query={categoryTitle} />)
        paginationComp = (<div/>)
        child = (<div/>)
      } else {
        resultCountComp = (<div/>)
        paginationComp = (<Pagination index={pagination.index} pages={pagination.pagesCount} onClick={goToPage}/>)
        child = (<Product.PreviewList username={username} list={pagination.page}/>)
      }
    }

    return (
      <section className="">
        <Breadcrumbs
          username={username}
          language={language}
          route="/category"
          parent={parent}
          child={category}
          onClick={loadCategory}
          disabledChild={true}
          categoryMode={true}
        />
        {productCreatorButton}
        {resultCountComp}
        {paginationComp}
        {child}
        {paginationComp}
      </section>
    )
  }
}

CategoryPage.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  parent: PropTypes.any,
  category: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    index: PropTypes.number.isRequired,
    page: PropTypes.array.isRequired,
    pagesCount: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired
  }).isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  isEditable: state.isEditable,
  language: state.language,//,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  parent: ownProps.match.params.parent !== undefined ? noLinkUnderscore(ownProps.match.params.parent) : null ,
  category: noLinkUnderscore(ownProps.match.params.category),
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
  loadCategory: (category) => dispatch(loadCategory(category)),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CategoryPage))
