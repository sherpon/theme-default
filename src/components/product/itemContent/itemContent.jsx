import React from 'react'
import PropTypes from 'prop-types'

import style from './itemContent.scss'

import { getPriceFormat } from '../../../models/tools'

import ItemContentShipping from '../itemContentShipping/itemContentShipping.jsx'
import ItemContentAttributes from '../itemContentAttributes/itemContentAttributes.jsx'

const ItemContent = ({ strings, username, item, onChangedSelect, addToCart, shareFacebook, shareWhatsapp }) => {
  const init = () => {
    /*$(document).ready(function(){
      $('.item-content__information-tabs').tabs()
    })*/
    setTimeout( () => {
      var elems = document.querySelectorAll('.item-content__information-tabs')
      var instance = M.Tabs.init(elems)
      //M.updateTextFields()
      //var elems = document.querySelectorAll('select')
      //var instances = M.FormSelect.init(elems)
    },100 )
  }

  const warningComp = (item.warning==='') ? (
    <div/>
  ) : (
    <div className="item-content__warning">
      {item.warning}
    </div>
  )

  return (
    <div className="item-content">

      <div className="item-content__title hide-on-small-only">
        <h4>{item.longTitle}</h4>
        <div className="item-content__id">
          {`${strings.labelId}: ${item.id}`}
        </div>
      </div>

      <div className="item-content__price">
        {`${item.symbol} ${getPriceFormat(item.price)}`}
      </div>

      <ItemContentShipping
        labelShipping={strings.labelShipping}
        labelDays={strings.labelDays}
        labelFree={strings.labelFree}
        shipping={item.shipping}
      />

      <ItemContentAttributes
        type={item.type}
        onChangedSelect={onChangedSelect}
        labelModel={strings.labelModel}
        labelSize={strings.labelSize}
        labelColor={strings.labelColor}
        attributes={item.attributes}
        variations={item.variations}
      />

      {warningComp}

      <div className="item-content__addToCart row">
        <div className="col s2 item-content__addToCart-col">
          <label htmlFor="item-content__addToCart__amount">Cnt</label>
        </div>

        <div className="col s2 item-content__addToCart-col">
          <input id="item-content__addToCart__amount" type="number" className="browser-default" style={{width: '100%'}} defaultValue={1}/>
        </div>

        <div className="col s8">
          <a
            onClick={ () => addToCart() }
            className="waves-effect waves-light btn-small z-depth-0 item-content__addToCart-button"
          >
            {strings.buttonAddToCart}
          </a>
        </div>
      </div>

      {/*
        <div className="item-content__share row">
          <div className="col s3 item-content__share-label">
            {strings.labelShare}
          </div>
          <div className="col s2">
            <a className="" onClick={ () => shareFacebook() }>
              <img src="../../../images/store/icons8-facebook-64.png" className="responsive-img item-content__share-icon"/>
            </a>
          </div>
          <div className="col s2">
            <a className="" onClick={ () => shareWhatsapp() }>
              <img src="../../../images/store/icons8-whatsapp-64.png" className="responsive-img item-content__share-icon"/>
            </a>
          </div>
        </div>
      */}

      <div className="item-content__information">
          <div className="row">
            <div className="col s12">
              <ul className="tabs item-content__information-tabs">
                <li className="tab col s4"><a className="active" href="#tab_content1">{strings.tabDescription}</a></li>
                <li className="tab col s4"><a href="#tab_content2">{strings.tabCharacteristics}</a></li>
                <li className="tab col s4"><a href="#tab_content3">{strings.tabInclude}</a></li>
              </ul>
            </div>
            <div id="tab_content1" className="col s12">{item.description}</div>
            <div id="tab_content2" className="col s12">{item.characteristics}</div>
            <div id="tab_content3" className="col s12">{item.include}</div>
          </div>
      </div>
      {init()}
    </div>
  )
}

ItemContent.propTypes = {
  strings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onChangedSelect: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  shareFacebook: PropTypes.func.isRequired,
  shareWhatsapp: PropTypes.func.isRequired
}

export default ItemContent
