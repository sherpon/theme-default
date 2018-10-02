import React from 'react'
import PropTypes from 'prop-types'

import style from './itemView.scss'

const _strings = {
  ES: require('./strings/itemView.ES.json'),
  EN: require('./strings/itemView.EN.json')
}

import ItemCarousel from '../itemCarousel/itemCarousel.jsx'
import ItemContent from '../itemContent/itemContent.jsx'

const ItemView = ({ language, username, item, onChangedSelect, addToCart, shareFacebook, shareWhatsapp }) => {
  const strings = _strings[language]

  //const { picture1, picture2, picture3, picture4, picture5, picture6, picture7 } = item
  const { pictures } = item

  return (
    <div className="item-view row">

      <div className="col s12 m6 l6">
        <ItemCarousel
          title={item.longTitle}
          labelId={strings.labelId}
          id={item.id}
          pictures={pictures}
        />
      </div>

      <div className="col s12 m6 l6">
        <ItemContent
          strings={strings}
          username={username}
          item={item}
          onChangedSelect={onChangedSelect}
          addToCart={addToCart}
          shareFacebook={shareFacebook}
          shareWhatsapp={shareWhatsapp}
        />
      </div>

    </div>
  )
}

ItemView.propTypes = {
  language: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChangedSelect: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  shareFacebook: PropTypes.func.isRequired,
  shareWhatsapp: PropTypes.func.isRequired
}

export default ItemView
