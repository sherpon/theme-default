import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import { createNewProduct } from '../actions/products/createNewProduct'

import { loadCanvas, loadPicture } from '../models/canvas'
import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
import Product from '../components/product'

const strings = {
  ES: {
    breadcrumbNewProduct:'Crear nuevo producto'
  },
  EN: {
    breadcrumbNewProduct:''
  }
}

class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {

    const { language, username, categories, isFetching, createNewProduct } = this.props

    if ( !session.inUserSession() ) {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

    return (
      <section className="product-page">
        <Breadcrumbs
          username={username}
          language={language}
          route="/product"
          parent={null}
          child={strings[language].breadcrumbNewProduct}
          onClick={ ()=> true }
          disabledChild={true}
        />
        <Product.Editor
          language={language}
          categories={categories}
          loadCanvas={loadCanvas}
          loadPicture={loadPicture}
          createNewProduct={createNewProduct}
        />
      </section>
    )
  }
}

ProductPage.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  createNewProduct: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  username: state.store.username,
  categories: state.store.categories,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  isFetching: state.isFetching
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  createNewProduct: () => dispatch(createNewProduct())
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(ProductPage))
