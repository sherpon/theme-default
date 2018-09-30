import React from 'react'

import style from './previewListPlaceholder.scss'

const PreviewListPlaceholder = ({}) => (
  <div className="preview-list-placeholder row">

    <div className="col s6 m6 l4">
      <img className="responsive-img preview-item" src="../../../images/store/placeholderPreviewItem.png"/>
    </div>

    <div className="col s6 m6 l4">
      <img className="responsive-img preview-item" src="../../../images/store/placeholderPreviewItem.png"/>
    </div>

    <div className="col s6 m6 l4">
      <img className="responsive-img preview-item" src="../../../images/store/placeholderPreviewItem.png"/>
    </div>

  </div>
)

export default PreviewListPlaceholder
