import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadPurchase } from '../actions/account'

import Strings from '../strings'
import session from '../models/session'
import { pageView } from '../models/analytics'

import Breadcrumbs from '../components/breadcrumbs/breadcrumbs'
import PurchaseView from '../components/purchaseView/purchaseView'

class PurchasePage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, loadPurchase, purchaseId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel()
    loadPurchase(purchaseId)
  }

  render() {
    const { strings, username, isFetching, purchase } = this.props

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
        <PurchaseView
          strings={strings}
          username={username}
          purchase={purchase}
        />
      )
    }

    return(
      <section>
        <Breadcrumbs
          username={username}
          home={strings.breadcrumbHome}
          route="/purchase"
          parent={null}
          child={strings.breadcrumbPurchases}
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
  isFetching: PropTypes.bool.isRequired,
  purchaseId: PropTypes.string.isRequired,
  purchase: PropTypes.object.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  loadPurchase: PropTypes.func.isRequired
}

const mapStateToProps = ( state, ownProps ) => ({
  strings: Strings(state.language).purchasePage,
  username: state.store.username,
  analyticsTrackerId: state.store.analytics,
  isFetching: state.isFetching,
  purchaseId: ownProps.match.params.id,
  purchase: state.purchase
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: () => {},
  loadPurchase: (purchaseId) => dispatch(loadPurchase(purchaseId))
})

export default withRouter(connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(PurchasePage))
