import React from 'react'
import PropTypes from 'prop-types'

const AccountView = ({strings, user, updateAccount, updatePassword}) => {

  const { name, lastname, phone, email } = user

  const _updateAccount = () => {
    const _name = document.getElementById('account-view__information__name__input').value
    const _lastname = document.getElementById('account-view__information__lastname__input').value
    const _phone = document.getElementById('account-view__information__phone__input').value
    const _email = document.getElementById('account-view__information__email__input').value
    updateAccount(_name, _lastname, _phone, _email)
  }

  const _updatePassword = () => {
    const _password1 = document.getElementById('account-view__information__password1__input').value
    const _password2 = document.getElementById('account-view__information__password2__input').value
    updatePassword(_password1, _password2)
  }

  const init = () => {
    // activa los text inputs
    $(document).ready(function() {
      M.updateTextFields()
    })
  }

  return (
    <div className="account-view">

      <div className="col s12 m12 l6">
        <div className="account-view__information">
          <div className="account-view__information__title">
            {strings.labelInformationTitle}
          </div>
          <div className="input-field account-view__information__input">
            <input id="account-view__information__name__input" type="text" defaultValue={name}/>
            <label htmlFor="account-view__information__name__input">{strings.labelInformationName}</label>
          </div>
          <div className="input-field account-view__information__input">
            <input id="account-view__information__lastname__input" type="text" defaultValue={lastname}/>
            <label htmlFor="account-view__information__lastname__input">{strings.labelInformationlastname}</label>
          </div>
          <div className="input-field account-view__information__input">
            <input id="account-view__information__phone__input" type="text" defaultValue={phone}/>
            <label htmlFor="account-view__information__phone__input">{strings.labelInformationPhone}</label>
          </div>
          <div className="input-field account-view__information__input">
            <input id="account-view__information__email__input" type="text" defaultValue={email}/>
            <label htmlFor="account-view__information__email__input">{strings.labelInformationEmail}</label>
          </div>
          <div className="account-view__information__button">
            <a
              onClick={ () => _updateAccount() }
              className="waves-effect waves-light btn-small z-depth-0"
              style={{width: '100%'}}
            >
              {strings.buttonInformation}
            </a>
          </div>
        </div>
      </div>

      <div className="col s12 m12 l6">
        <div className="account-view__information">
          <div className="account-view__information__title">
            {strings.labelPasswordTitle}
          </div>
          <div className="input-field account-view__information__input">
            <input id="account-view__information__password1__input" type="password"/>
            <label htmlFor="account-view__information__password1__input">{strings.labelPassword1}</label>
          </div>
          <div className="input-field account-view__information__input">
            <input id="account-view__information__password2__input" type="password"/>
            <label htmlFor="account-view__information__password2__input">{strings.labelPassword2}</label>
          </div>
          <div className="account-view__information__button">
            <a
              onClick={ () => _updatePassword() }
              className="waves-effect waves-light btn-small z-depth-0"
              style={{width: '100%'}}
            >
              {strings.buttonPassword}
            </a>
          </div>
        </div>
      </div>

      {init()}
    </div>
  )
}

AccountView.propsType = {
  strings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateAccount: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
}

export default AccountView
