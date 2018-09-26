import React from 'react'
import PropTypes from 'prop-types'

import { json2array } from '../../models/tools'

const ItemCarousel = ({ title, labelId, id, pictures }) => {
  const init = () => {
    $(document).ready(function(){
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      })
      //$('.materialboxed').materialbox() materialboxed
    })
  }

  const _pictures = json2array(pictures)

  const picturesComp = _pictures.map( (picture, i) => {
    if (picture !== '') {
      return (
        <a 
          key={i}
          className="carousel-item"
        >
          <img 
            className="responsive-img" 
            src={picture}
          />
        </a>
      )
    } else {
      return (<div key={i}/>)
    }
  })

  const pictureListItemComp = _pictures.map( (picture, i) => {
    if (picture !== '') {
      return (
        <div key={i}className="col s2">
          <a onClick={ () => ($('.carousel').carousel('set', i)) }>
            <img 
              className="responsive-img" 
              src={picture}
            />
          </a>
        </div>
      )
    } else {
      return (<div key={i}/>)
    }
  })

  return (
    <div className="item-carousel">
      <div className="item-carousel__title hide-on-med-and-up">
        <h4>{title}</h4>
        <div className="item-carousel__id">
          {`${labelId}: ${id}`}
        </div>
      </div>
      <div className="carousel carousel-slider center">
        {picturesComp}
      </div>
      <div className="item-carousel__pictures-list">
        {pictureListItemComp}
      </div>
      {init()}
    </div>
  )
}

ItemCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  pictures: PropTypes.object.isRequired
}

export default ItemCarousel