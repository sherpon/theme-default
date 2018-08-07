import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { goToPage, loadCategory } from '../actions'
import Strings from '../strings'

import { noLinkUnderscore } from '../models/tools'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import Pagination from '../components/pagination/pagination'
import ResultCount from '../components/resultCount/resultCount'
import PreviewListPlaceholder from '../components/previewListPlaceholder/previewListPlaceholder'
import PreviewList from '../components/previewList/previewList'

class CategoryPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, category, loadCategory } = this.props
    analytics()
    facebookPixel()
    loadCategory(category)
  }

  render () {
    const { username, strings, parent, category, isResultLoaded, pagination, loadCategory, goToPage } = this.props

    let child, resultCountComp, paginationComp

    if (isResultLoaded) {
      if ( pagination.itemsCount === 0 ) {
        resultCountComp = (<ResultCount itemsCount={pagination.itemsCount} label={strings.labelResult} query={category} />)
        paginationComp = (<div/>)
        child = (<div/>)
      } else {
        resultCountComp = (<div/>)
        paginationComp = (<Pagination index={pagination.index} pages={pagination.pagesCount} onClick={goToPage}/>)
        child = (<PreviewList username={username} list={pagination.page}/>)
      }
    } else {
      resultCountComp = (<div/>)
      paginationComp = (<Pagination index={pagination.index} pages={pagination.pagesCount} onClick={goToPage}/>)
      child = (<PreviewListPlaceholder/>)
    }

    return (
      <section className="">
        <Breadcrumbs
          username={username}
          home={strings.breadcrumbHome}
          route="/category"
          parent={parent}
          child={category}
          onClick={loadCategory}
          disabledChild={true}
        />
        {resultCountComp}
        {paginationComp}
        {child}
        {paginationComp}
      </section>
    )
  }
}

CategoryPage.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  parent: PropTypes.any,
  category: PropTypes.string.isRequired,
  isResultLoaded: PropTypes.bool.isRequired,
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
  strings: Strings(state.language).categoryPage,
  username: state.storeState.username,
  parent: ownProps.match.params.parent !== undefined ? noLinkUnderscore(ownProps.match.params.parent) : null ,
  category: noLinkUnderscore(ownProps.match.params.category),
  isResultLoaded: state.isResultLoaded,
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
  loadCategory: (category) => dispatch(loadCategory(category)),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CategoryPage))