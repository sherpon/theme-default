import React from 'react'
import PropTypes from 'prop-types'

import style from './itemCarousel.scss'
//import { json2array } from '../../../models/tools'

const ItemCarousel = ({ title, labelId, id, pictures }) => {
  const init = () => {
    /*$(document).ready(function(){
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      })
      //$('.materialboxed').materialbox() materialboxed
    })*/
    setTimeout( () => {
      //M.updateTextFields()
      //var elems = document.querySelectorAll('select')
      //var instances = M.FormSelect.init(elems)
      var elems = document.querySelectorAll('.carousel.carousel-slider')
      var options = {
        fullWidth: true,
        indicators: true
      }
      var instances = M.Carousel.init(elems, options)
    },100 )
  }

  //const _pictures = json2array(pictures)
  const _pictures = pictures

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
          <a
            onClick={ () => {
              //$('.carousel').carousel('set', i)
              var elems = document.querySelectorAll('.carousel.carousel-slider')
              var instance = M.Carousel.getInstance(elems[0])
              instance.set(i)
            } }>
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
      <div className="item-carousel__pictures-list row">
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
  pictures: PropTypes.array.isRequired
}

export default ItemCarousel
