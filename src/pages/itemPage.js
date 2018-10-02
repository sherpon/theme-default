import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  loadItem,
  onChangedSelect,
  addToCart,
  shareFacebook,
  shareWhatsapp
} from '../actions/products/loadItem'

import { loadCategory } from '../actions/categories/loadCategory'

import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import ItemViewPlaceholder from '../components/product/itemViewPlaceholder/itemViewPlaceholder.jsx'
import ItemView from '../components/product/itemView/itemView.jsx'

class ItemPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadItem, itemId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadItem(itemId)
  }

  render() {

    const { language, username, isFetching, item, loadCategory, onChangedSelect, addToCart } = this.props

    let itemViewComp, breadcrumbsComp

    if (isFetching) {
      breadcrumbsComp = (<div/>)
      itemViewComp = (<ItemViewPlaceholder/>)
    } else {

      breadcrumbsComp = (
        <Breadcrumbs
          username={username}
          language={language}
          route="/category"
          parent={ (item.categories[0].type==='primary') ? (null) : (item.categories[0].parent) }
          child={item.categories[0].name}
          onClick={loadCategory}
          disabledChild={false}
        />)
      itemViewComp = (
        <ItemView
          language={language}
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
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadItem: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  onChangedSelect: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  itemId: ownProps.match.params.id,
  isFetching: state.isFetching,
  item: state.product
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  loadItem: (itemId) => dispatch(loadItem(itemId)),
  loadCategory: (category) => dispatch(loadCategory(category)),
  onChangedSelect: () => dispatch(onChangedSelect()),
  addToCart: () => dispatch(addToCart())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ItemPage))
