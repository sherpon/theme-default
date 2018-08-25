import React from 'react'
import PropTypes from 'prop-types'

const MarketingView = ({strings, analyticsTrackerId, facebookPixelId, marketingSaveButton}) => {
  const init = () => {
    // activa los text inputs
    $(document).ready(function() {
      M.updateTextFields()
    })
  }

  return (
    <div className="marketing-view">

      <div className="marketing-view__title">
        {strings.labelTitle}
      </div>
      <div className="input-field">
        <input id="marketing-view__analytics__input" type="text" defaultValue={analyticsTrackerId}/>
        <label htmlFor="marketing-view__analytics__input">{strings.labelAnalytics}</label>
      </div>
      <div className="input-field">
        <input id="marketing-view__facebook-pixel__input" type="text" defaultValue={facebookPixelId}/>
        <label htmlFor="marketing-view__facebook-pixel__input">{strings.labelFacebookPixel}</label>
      </div>
      <div className="marketing-view__button">
        <a
          onClick={ () => marketingSaveButton() }
          className="waves-effect waves-light btn-small z-depth-0"
        >
          {strings.buttonSave}
        </a>
      </div>

      {init()}
    </div>
  )
}

MarketingView.propsType = {
  strings: PropTypes.object.isRequired,
  analyticsTrackerId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string.isRequired,
  marketingSaveButton: PropTypes.func.isRequired
}

export default MarketingView
