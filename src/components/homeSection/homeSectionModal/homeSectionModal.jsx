import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

import style from './homeSectionModal.scss'

const _strings = {
  ES: require('./strings/homeSectionModal.ES.json'),
  EN: require('./strings/homeSectionModal.EN.json')
}

import { noLinkEspace } from '../../../models/tools'

/**
 * SectionModal component
 * Needs to use in the parent component after declaration
 * $(document).ready(function(){
 *   $('.section-modal').modal()
 *   $('select').formSelect()
 * })
 *
 *
 */
class HomeSectionModal extends React.Component {
  constructor(props) {
    super(props)
    this._cancel = this._cancel.bind(this)
    this._publish = this._publish.bind(this)
  }

  componentDidMount() {
    const { id, loadCanvas, defaultPicture } = this.props

    loadCanvas(`${id}__mobileCanvas`, defaultPicture)
    loadCanvas(`${id}__desktopCanvas`, defaultPicture)

    /** when a canvas has been clicked, trigger the input's onclick event */
    $(`#${id}__mobileCol`).click( () => $(`#${id}__mobileInput`).trigger('click') )
    $(`#${id}__desktopCol`).click( () => $(`#${id}__desktopInput`).trigger('click') )
  }

  _cancel() {
    const { id } = this.props
    //$(`#${id}`).modal('close')
    var elems = document.querySelectorAll(`#${id}`)
    var instances = M.Modal.init(elems)
    instances[0].close()
    document.body.style.overflow = ''
  }

  _publish() {
    //console.log('publish')
    const { id, homeSectionModalPublishButton } = this.props
    homeSectionModalPublishButton(id, () => {
      //$(`#${id}`).modal('close')
      var elems = document.querySelectorAll(`#${id}`)
      var instances = M.Modal.init(elems)
      instances[0].close()
      document.body.style.overflow = ''
    })
  }

  render() {
    const { id, language, loadPicture, defaultPicture, categories } = this.props
    const strings = _strings[language]
    const cancel = this._cancel
    const publish = this._publish

    let selectDestinationOptions = []
    for ( let i = 0 ; i < categories.length ; i++ ) {
      const parent = categories[i]
      const parentKey = i*1000
      selectDestinationOptions.push(
        <option
          key={parentKey}
          value={`/category/${noLinkEspace(parent.name)}`}
        >
          {`${parent.name}`}
        </option>
      )

      for ( let j = 0 ; j < parent.children.length ; j++ ) {
        const child = parent.children[j]
        const childKey = (i*1000)+j+1
        selectDestinationOptions.push(
          <option
            key={childKey}
            value={`/category/${noLinkEspace(parent.name)}/${noLinkEspace(child.name)}`}
          >
            {`${parent.name} - ${child.name}`}
          </option>
        )
      }

    }

    return(
      <div
        id={id}
        className="modal section-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>

          <div className="section-modal__picture row">
            <div id={`${id}__mobileCol`} className="col s6 section-modal__picture__col">
              <canvas id={`${id}__mobileCanvas`} className="section-modal__picture__canvas"></canvas>
              <input type='file' id={`${id}__mobileInput`} className="section-modal__picture__input"
                onChange={ () => loadPicture(`${id}__mobileInput`, `${id}__mobileCanvas`, defaultPicture) }
              />
              {`${strings.labelMobile} (${strings.labelMobileDimension})`}
            </div>
            <div id={`${id}__desktopCol`} className="col s6 section-modal__picture__col">
              <canvas id={`${id}__desktopCanvas`} className="section-modal__picture__canvas"></canvas>
              <input type='file' id={`${id}__desktopInput`} className="section-modal__picture__input"
                onChange={ () => loadPicture(`${id}__desktopInput`, `${id}__desktopCanvas`, defaultPicture) }
              />
              {`${strings.labelDesktop} (${strings.labelDesktopDimension})`}
            </div>
          </div>

          <div className="section-modal__destination row">
            <div className="input-field">
              <select id={`${id}__section-modal__destination__select`} defaultValue="">
                <option value="" disabled>-</option>
                { selectDestinationOptions.map( (option) => (option) ) }
              </select>
              <label htmlFor={`${id}__section-modal__destination__select`}>{strings.labelDestination}</label>
            </div>
          </div>

        </div>

        <div className="modal-footer">
          <a className="waves-effect btn-flat"
            onClick={ () => cancel() }
          >
            {strings.buttonCancel}
          </a>
          <a className="waves-effect waves-light btn-small z-depth-0"
            onClick={ () => publish() }
          >
            {strings.buttonPublish}
          </a>
        </div>
      </div>
    )
  }
}

HomeSectionModal.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  loadCanvas: PropTypes.func.isRequired,
  loadPicture: PropTypes.func.isRequired,
  defaultPicture: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  homeSectionModalPublishButton: PropTypes.func.isRequired
}

export default HomeSectionModal
