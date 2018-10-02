import React from 'react'

import style from './itemViewPlaceholder.scss'

const ItemViewPlaceholder = ({}) => (
  <div className="item-view-placeholder row">

    <div className="col s12 m6 l6">
      <img className="responsive-img" src="../../../images/store/placeholderItem1.png"/>
    </div>

    <div className="col s12 m6 l6">
      <img className="responsive-img" src="../../../images/store/placeholderItem2.png"/>
    </div>

  </div>
)

export default ItemViewPlaceholder
