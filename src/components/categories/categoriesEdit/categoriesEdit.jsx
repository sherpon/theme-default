import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './categoriesEdit.scss'

const _strings = {
  ES:require('./strings/categoriesEdit.ES.json'),
  EN:require('./strings/categoriesEdit.EN.json')
}

const Category = ({
    to,
    name,
    order
  }) => (
  <div className="row">
    <div className="col s7 m7 categories-edit__category">
      <Link to={to}>
        {name}
      </Link>
    </div>
    <div className="col s2 m2 categories-edit__category">
      {order}
    </div>
    <div className="col s3 m3 categories-edit__category">
      {'delete'}
    </div>
  </div>
)

Category.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired
}

const CategoriesEdit = ({
    language,
    username,
    categories,
    noLinkEspace
  }) => {
  const strings = _strings[language]
  let categoriesComp = []

  for ( let i = 0 ; i < categories.length ; i++ ) {
    const parent = categories[i]
    const parentKey = i*1000
    categoriesComp.push(
      <Category
        key={parentKey}
        to={`/${username}/category/${noLinkEspace(parent.name)}`}
        name={`${parent.name}`}
        order={parseInt(parent.order)}
      />
    )

    for ( let j = 0 ; j < parent.children.length ; j++ ) {
      const child = parent.children[j]
      const childKey = (i*1000)+j+1
      categoriesComp.push(
        <Category
          key={childKey}
          to={`/${username}/category/${noLinkEspace(parent.name)}/${noLinkEspace(child.name)}`}
          name={`${parent.name} - ${child.name}`}
          order={parseInt(child.order)}
        />
      )
    }

  }

  return(
    <div className="categories-edit">
      <div className="row">
        <div className="col s7 m7 categories-edit__header">{strings.headerName}</div>
        <div className="col s2 m2 categories-edit__header">{strings.headerOrder}</div>
        <div className="col s3 m3 categories-edit__header">{strings.headerDelete}</div>
      </div>
      { categoriesComp.map((categoryComp)=>(categoryComp)) }
    </div>
  )
}

CategoriesEdit.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  categories: PropTypes.any.isRequired,
  noLinkEspace: PropTypes.func.isRequired
}

export default CategoriesEdit
