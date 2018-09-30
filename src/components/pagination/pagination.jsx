import React from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import style from './pagination.scss'

const Pagination = ({ index, pages, onClick }) => {
  const arrowLeft = (index===0) ? (
    <li className="disabled"><a className="page-disabled"><i className="material-icons">chevron_left</i></a></li>
  ) : (
    <li className="waves-effect"><a className="page-button" onClick={ () => onClick(index-1) }><i className="material-icons">chevron_left</i></a></li>
  )

  const arrowRight = (index>=(pages-1) ) ? (
    <li className="disabled"><a className="page-disabled"><i className="material-icons">chevron_right</i></a></li>
  ) : (
    <li className="waves-effect"><a className="page-button" onClick={ () => onClick(index+1) }><i className="material-icons">chevron_right</i></a></li>
  )

  let itemList = []

  for (let i=0;i<pages;i++) {
    if ( index===(i) ) {
      itemList.push(<li key={i} className="active"><a>{i+1}</a></li>)
    } else {
      itemList.push(<li key={i} className="waves-effect"><a className="page-button" onClick={ () => onClick(i) }>{i+1}</a></li>)
    }

  }

  return (
    <div className="pagination">
      <ul className="center-align">
        {arrowLeft}
        {itemList.map( (item) => (item) )}
        {arrowRight}
      </ul>
    </div>
  )
}

/*

<ul className="pagination center-align">
        <li className="disabled"><a href="#!" className="page-button"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!" className="page-button">2</a></li>
        <li className="waves-effect"><a href="#!" className="page-button">3</a></li>
        <li className="waves-effect"><a href="#!" className="page-button">4</a></li>
        <li className="waves-effect"><a href="#!" className="page-button">5</a></li>
        <li className="waves-effect"><a href="#!" className="page-button"><i className="material-icons">chevron_right</i></a></li>
      </ul>

 */

Pagination.propTypes = {
  index: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Pagination
