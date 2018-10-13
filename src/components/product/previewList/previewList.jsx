import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import PreviewItem from '../previewItem/previewItem.jsx'

import style from './previewList.scss'

const getMediaQueryRanges = () => {
  const widthAvailable = $(document).width()

  if ( widthAvailable < 601 ) {
    return 'SMALL'
  } else if ( 601 <= widthAvailable && widthAvailable <= 992 ) {
    return 'MEDIUM'
  } else {
    return 'LARGE'
  }
}

const PreviewList = ({username, list}) => {
  const widthAvailable = getMediaQueryRanges()

  let _list = []

  if ( widthAvailable==='SMALL' || widthAvailable==='MEDIUM' ) {
    for (let i = 0;i<list.length;i++) {
      _list.push(<PreviewItem key={i} username={username} item={list[i]}/>)
      if (1===i%2) {
        _list.push(<div key={i*100} className="sherpon-preview-list-clear"/>)
      }
    }
  } else {
    for (let i = 0;i<list.length;i++) {
      _list.push(<PreviewItem key={i} username={username} item={list[i]}/>)
      if (2===i%3) {    // 3===i%4 es para vista de 4 por fila / 2===i%3 es para vista de 3 por fila
        _list.push(<div key={i*100} className="sherpon-preview-list-clear"/>)
      }
    }
  }

  return (
    <div className="">
      <div className="row">
      { _list.map( (item) => (item) ) }
      </div>

    </div>
  )
}

PreviewList.propTypes = {
  username: PropTypes.string.isRequired,
  list: PropTypes.any.isRequired
}

export default PreviewList
