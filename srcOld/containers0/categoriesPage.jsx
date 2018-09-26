import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { categoriesSaveButton } from '../actions/store'
import Strings from '../strings'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { noLinkEspace } from '../models/tools'

//import TermsView from '../components/termsView/termsView.js'
import Terms from '../components/terms'
import Categories from '../components/categories'

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { isEditable, strings, terms, categories, username, categoriesSaveButton } = this.props

    const init = () => {
      /** this load the modals */
      $(document).ready(function(){
        $('.modal').modal()
        $('select').formSelect()
      })
    }

    if (isEditable) {
      return(
        <div className="categories-page">
          <Categories.Creator
            strings={strings}
          />
          <Categories.Modal
            strings={strings.modal}
            categories={categories}
            categoriesSaveButton={categoriesSaveButton}
          />
          <Categories.Edit
            strings={strings.edit}
            username={username}
            categories={categories}
            noLinkEspace={noLinkEspace}
          />
          {init()}
        </div>
      )
    } else {
      return(
        <Categories.View
          username={username}
          categories={categories}
          noLinkEspace={noLinkEspace}
        />
      )
    }
  }
}

CategoriesPage.propTypes = {
  strings: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  terms: PropTypes.object.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  categoriesSaveButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  strings: Strings(state.language).categoriesPage,
  isEditable: state.isEditable,
  categories: state.store.categories,
  username: state.store.username,
  terms: state.store.theme.data.terms,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  categoriesSaveButton: (callback) => dispatch(categoriesSaveButton(callback))
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CategoriesPage)

/*

<Terms.Modal
  strings={strings.modal}
  terms={terms}
  categoriesSaveButton={categoriesSaveButton}
/>
*/
