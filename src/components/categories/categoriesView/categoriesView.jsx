import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './categoriesView.scss'

const Categories = ({
    username,
    categories,
    noLinkEspace
  }) => {
  const init = () => {
    /*document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible')
      var instances = M.Collapsible.init(elems)
    })*/
    setTimeout( () => {
      var elems = document.querySelectorAll('.collapsible')
      var instances = M.Collapsible.init(elems)
    },100 )
  }

  return (
    <section className="categories__view">
      <ul className="collapsible z-depth-0 sherpon-border-0px">
        {categories.map( (category,i) => (
          <li
            key={i}
          >
            <div className="collapsible-header sherpon-border-0px">
              <i className="material-icons">expand_more</i>
              {category.name}
            </div>
            <div className="collapsible-body sherpon-border-0px sherpon-background-color-white">
              <ul className="collection">
                <li className="collection-item sherpon-border-0px">
                  <Link
                    to={`/${username}/category/${noLinkEspace(category.name)}`}>
                    {category.name}
                  </Link>
                </li>
                {
                  category.children.map( (child,i) => (
                    <li
                      key={i}
                      className="collection-item sherpon-border-0px"
                    >
                      <Link
                        to={`/${username}/category/${noLinkEspace(category.name)}/${noLinkEspace(child.name)}`}>
                        {child.name}
                      </Link>
                    </li>
                  ) )
                }
              </ul>
            </div>
          </li>
          )
        )}
      </ul>
      {init()}
    </section>
  )
}

Categories.propTypes = {
  username: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  noLinkEspace: PropTypes.func.isRequired
}

export default Categories
