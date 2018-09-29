import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { categoriesCreateButton } from '../actions/categories/create'
import { pageView } from '../models/analytics'
import { pixelPageView } from '../models/facebookPixel'
import { noLinkEspace } from '../models/tools'

import Categories from '../components/categories'

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props)
    const { analytics, facebookPixel, analyticsTrackerId, facebookPixelId } = this.props
    analytics(analyticsTrackerId)
    facebookPixel(facebookPixelId)
  }

  render() {
    const { isEditable, language, categories, username, categoriesCreateButton } = this.props

    const init = () => {
      /** this load the modals */
      /*document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems)
        var elems = document.querySelectorAll('select')
        var instances = M.FormSelect.init(elems)
      })*/
      setTimeout( () => {
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems)
        var elems = document.querySelectorAll('select')
        var instances = M.FormSelect.init(elems)
      },100 )
    }

    if (isEditable) {
      return(
        <div className="categories-page">
          <Categories.Creator
            language={language}
          />
          <Categories.Modal
            language={language}
            categories={categories}
            categoriesCreateButton={categoriesCreateButton}
          />
          <Categories.Edit
            language={language}
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
  language: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  analytics: PropTypes.func.isRequired,
  facebookPixel: PropTypes.func.isRequired,
  categoriesCreateButton: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  language: state.language,
  isEditable: state.isEditable,
  categories: state.store.categories,
  username: state.store.username,
  analyticsTrackerId: state.store.data.analytics,
  facebookPixelId: state.store.data.facebookPixel
})

const mapDispatchToProps = dispatch => ({
  analytics: (analyticsTrackerId) => pageView(analyticsTrackerId),
  facebookPixel: (facebookPixelId) => pixelPageView(facebookPixelId),
  categoriesCreateButton: (callback) => dispatch(categoriesCreateButton(callback))
})

export default connect(
  mapStateToProps,  // Note 1
  mapDispatchToProps
)(CategoriesPage)

/*

*/
