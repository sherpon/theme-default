import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { goToPage, loadSearch } from '../actions'
import Strings from '../strings'

import { getQueryValue, noLinkUnderscore } from '../models/tools'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import Pagination from '../components/pagination/pagination'
import ResultCount from '../components/resultCount/resultCount'
import PreviewListPlaceholder from '../components/previewListPlaceholder/previewListPlaceholder'
import PreviewList from '../components/previewList/previewList'

class ResultSearch extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, query, loadSearch } = this.props
    analytics()
    facebookPixel()
    loadSearch(query)
  }

  render () {
    const { username, strings, query, isResultLoaded, pagination, loadSearch, goToPage } = this.props

    let child, resultCountComp, paginationComp

    if (isResultLoaded) {
      if ( pagination.itemsCount === 0 ) {
        resultCountComp = (<ResultCount itemsCount={pagination.itemsCount} label={strings.labelResult} query={query} />)
        paginationComp = (<div/>)
        child = (<div/>)
      } else {
        resultCountComp = (<ResultCount itemsCount={pagination.itemsCount} label={strings.labelResult} query={query} />)
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
          route="/search"
          parent={null}
          child={strings.labelSearch}
          onClick={loadSearch}
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

ResultSearch.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  isResultLoaded: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    index: PropTypes.number.isRequired,
    page: PropTypes.array.isRequired,
    pagesCount: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired
  }).isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadSearch: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).searchPage,
  username: state.store.username,
  query: getQueryValue('search'),
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
  loadSearch: (query) => dispatch(loadSearch(query)),
  goToPage: (index) => dispatch(goToPage(index))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ResultSearch))