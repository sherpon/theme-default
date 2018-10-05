import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import { loadSale } from '../actions/account'
import { loadSale } from '../actions/sales/loadSale'

import session from '../models/session'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.jsx'
//import PurchaseView from '../components/purchaseView/purchaseView'
import Sale from '../components/sale'

const strings = {
  ES: {
    breadcrumbPurchases:'Mis compras'
  },
  EN: {
    breadcrumbPurchases:''
  }
}

class PurchasePage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId, loadSale, purchaseId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
    loadSale(purchaseId)
  }

  render() {
    const { language, username, isFetching, sale } = this.props

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
          language={language}
          username={username}
          sale={sale}
          deleteButton={false}
        />
      )
    }

    return(
      <section>
        <Breadcrumbs
          username={username}
          language={language}
          route="/purchase"
          parent={null}
          child={strings[language].breadcrumbPurchases}
          onClick={ ()=> true }
          disabledChild={true}
        />
        {purchaseComp}
      </section>
    )
  }
}

PurchasePage.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  purchaseId: PropTypes.string.isRequired,
  sale: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadSale: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  language: state.language,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel,
  isFetching: state.isFetching,
  purchaseId: ownProps.match.params.id,
  sale: state.sale
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  loadSale: (purchaseId) => dispatch(loadSale(purchaseId))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(PurchasePage))
