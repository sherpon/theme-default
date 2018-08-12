import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadItem, onChangedSelect, addToCart, facebookInit, shareFacebook, shareWhatsapp } from '../actions/item'
import { loadCategory } from '../actions'

import Strings from '../strings'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import ItemViewPlaceholder from '../components/itemViewPlaceholder/itemViewPlaceholder'
import ItemView from '../components/itemView/itemView'

class ItemPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    const { analytics, facebookPixel, loadItem, itemId, facebookInit } = this.props
    analytics()
    facebookPixel()
    loadItem(itemId)
  }

  render() {

    const { strings, username, isFetching, item, loadCategory, onChangedSelect, addToCart, shareFacebook, shareWhatsapp } = this.props

    let itemViewComp, breadcrumbsComp

    if (isFetching) {
      breadcrumbsComp = (<div/>)
      itemViewComp = (<ItemViewPlaceholder/>)
    } else {

      breadcrumbsComp = (
        <Breadcrumbs
          username={username}
          home={strings.breadcrumbHome}
          route="/category"
          parent={ (item.categories[0].type==='primary') ? (null) : (item.categories[0].parent) }
          child={item.categories[0].name}
          onClick={loadCategory}
          disabledChild={false}
        />)
      itemViewComp = (
        <ItemView
          strings={strings}
          username={username}
          item={item}
          onChangedSelect={onChangedSelect}
          addToCart={addToCart}
          shareFacebook={shareFacebook}
          shareWhatsapp={shareWhatsapp}
        />)
    }

    return (
      <section className="item-page">
        {breadcrumbsComp}
        {itemViewComp}
      </section>
    )
  }
}

ItemPage.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadItem: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  onChangedSelect: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  facebookInit: PropTypes.func.isRequired,
  shareFacebook: PropTypes.func.isRequired,
  shareWhatsapp: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).itemPage,
  username: state.store.username,
  itemId: ownProps.match.params.id,
  isFetching: state.isFetching,
  item: state.item
})

const mapDispatchToProps = dispatch => ({
  analytics: () => {},
  facebookPixel: () => {},
  loadItem: (itemId) => dispatch(loadItem(itemId)),
  loadCategory: (category) => dispatch(loadCategory(category)),
  onChangedSelect: () => dispatch(onChangedSelect()),
  addToCart: () => dispatch(addToCart()),
  facebookInit: () => facebookInit(),
  shareFacebook: () => shareFacebook(),
  shareWhatsapp: () => shareWhatsapp()
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ItemPage))