import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadSale } from '../actions/store'

import Strings from '../strings'
import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import Sale from '../components/sale'

class PurchasePage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadSale, saleId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadSale(saleId)
  }

  render() {
    const { strings, username, isFetching, sale } = this.props

    if ( !session.inUserSession() ) {
      return (
        <Redirect to={`/${username}`}/>
      )
    }

    let purchaseComp

    if (isFetching) {
      purchaseComp = (<div/>)
    } else {
      purchaseComp = (
        <Sale.View
          strings={strings}
          username={username}
          sale={sale}
        />
      )
    }

    return(
      <section>
        <Breadcrumbs
          username={username}
          home={strings.breadcrumbHome}
          route="/sale"
          parent={null}
          child={strings.breadcrumbSales}
          onClick={ ()=> true }
          disabledChild={true}
        />
        {purchaseComp}
      </section>
    )
  }
}

PurchasePage.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  saleId: PropTypes.string.isRequired,
  sale: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadSale: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).pages.sale,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  isFetching: state.isFetching,
  saleId: ownProps.match.params.id,
  sale: state.sale
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  loadSale: (saleId) => dispatch(loadSale(saleId))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(PurchasePage))
