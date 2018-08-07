import React from 'react'
import PropTypes from 'prop-types'

import ItemCarousel from '../itemCarousel/itemCarousel'
import ItemContent from '../itemContent/itemContent'

const ItemView = ({ strings, username, item, onChangedSelect, addToCart, shareFacebook, shareWhatsapp }) => {
  const { picture1, picture2, picture3, picture4, picture5, picture6, picture7 } = item

  return (
    <div className="item-view">

      <div className="col s12 m6 l6">
        <ItemCarousel
          title={item.longTitle}
          labelId={strings.labelId}
          id={item.id}
          pictures={{ picture1, picture2, picture3, picture4, picture5, picture6, picture7 }}
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
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChangedSelect: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  shareFacebook: PropTypes.func.isRequired,
  shareWhatsapp: PropTypes.func.isRequired
}

export default ItemView