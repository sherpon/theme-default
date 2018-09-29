import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

import style from './categoriesModal.scss'

const _strings = {
  ES:require('./strings/categoriesModal.ES.json'),
  EN:require('./strings/categoriesModal.EN.json')
}

class CategoriesModal extends React.Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this._cancel = this._cancel.bind(this)
    this._save = this._save.bind(this)
  }

  componentDidMount() {
    //const { shortDescription } = this.props
    //$('#categories-modal').val(shortDescription)
    //M.textareaAutoResize($('#categories-modal'))
  }

  _onChange() {
    $('#categories-modal__parent__input').toggleClass('categories-modal__parent--hidden')
    /*const _ = document.querySelector('input[name="group1"]:checked').value
    if ( _ === '') {
      $('#categories-modal__parent').toggleClass('disabled')
    } else {
      $('#categories-modal__parent').toggleClass('disabled')
    }*/
  }

  _cancel() {
    //$('#categories-modal').modal('close')
    var elems = document.querySelectorAll('#categories-modal')
    var instances = M.Modal.init(elems)
    instances[0].close()
    document.body.style.overflow = ''
  }

  _save() {
    const { categoriesCreateButton } = this.props
    categoriesCreateButton( () => {
      //$('#categories-modal').modal('close')
      var elems = document.querySelectorAll('#categories-modal')
      var instances = M.Modal.init(elems)
      instances[0].close()
      document.body.style.overflow = ''
    })
  }

  render() {
    const { language, categories } = this.props
    const strings = _strings[language]
    const cancel = this._cancel
    const save = this._save
    const init = () => {
      //$('#categories-modal__textarea').val(shortDescription)
      //M.textareaAutoResize($('#categories-modal'))
    }

    let selectParentOptions = []
    for ( let i = 0 ; i < categories.length ; i++ ) {
      const parent = categories[i]
      const parentKey = i*1000
      selectParentOptions.push(
        <option
          key={parentKey}
          value={`${parent.name}`}
        >
          {`${parent.name}`}
        </option>
      )

    }

    return(
      <div
        id="categories-modal"
        className="modal categories-modal"
      >
        <div className="modal-content">
          <h4>{strings.title}</h4>
          <div className="input-field">
            <input id="categories-modal__name" type="text" />
            <label htmlFor="categories-modal__name">{strings.labelName}</label>
          </div>
          <div className="input-field">
            <input id="categories-modal__order" type="number" />
            <label htmlFor="categories-modal__order">{strings.labelOrder}</label>
          </div>

          <p>
            <label>
              <input name="group1" type="radio" defaultChecked
                value={'primary'}
                onChange={ () => this._onChange() }
              />
              <span>{strings.labelPrimary}</span>
            </label>
          </p>
          <p>
            <label>
              <input name="group1" type="radio"
                value={'secundary'}
                onChange={ () => this._onChange() }
              />
              <span>{strings.labelSecundary}</span>
            </label>
          </p>

          <div id="categories-modal__parent__input" className="input-field categories-modal__parent--hidden">
            <select id="categories-modal__parent" className="" defaultValue="">
              <option value="" disabled>-</option>
              { selectParentOptions.map( (option) => (option) ) }
            </select>
            <label htmlFor="categories-modal__parent">{strings.labelParent}</label>
          </div>

        </div>

        <div className="modal-footer">
          <a className="waves-effect btn-flat"
            onClick={ () => cancel() }
          >
            {strings.buttonCancel}
          </a>
          <a className="waves-effect waves-light btn-small z-depth-0"
            onClick={ () => save() }
          >
            {strings.buttonSave}
          </a>
        </div>
        {
          init()
        }
      </div>
    )
  }
}

CategoriesModal.propTypes = {
  language: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  categoriesCreateButton: PropTypes.func.isRequired
}

export default CategoriesModal
