import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './loginView.scss'

const _strings = {
  ES: require('./strings/loginView.ES.json'),
  EN: require('./strings/loginView.EN.json')
}

const LoginView = ({language, basename, login, signup, guest, mode}) => {
  const strings = _strings[language]

  const _login = () => {
    const _email = document.getElementById('login-view__login__email__input').value
    const _password = document.getElementById('login-view__login__password__input').value
    login(_email, _password)
  }

  const _signup = () => {
    const _name = document.getElementById('login-view__signup__name__input').value
    const _lastname = document.getElementById('login-view__signup__lastname__input').value
    const _phone = document.getElementById('login-view__signup__phone__input').value
    const _email = document.getElementById('login-view__signup__email__input').value
    const _password = document.getElementById('login-view__signup__password__input').value
    signup(_name, _lastname, _phone, _email, _password)
  }
  //const guestComp

  let loginComp, signupComp, guestComp

  if (guest) {
    guestComp = (
      <div className="login-view__guest">
        <div className="login-view__guest__title">
          {strings.guest.labelTitle}
        </div>
        <div className="login-view__guest__comment">
          {strings.guest.labelComment}
        </div>
        <Link
          to={`${basename}/checkout`}
          className="waves-effect waves-light btn-small z-depth-0 teal accent-3"
          style={{'width':'100%'}}
        >
          {strings.guest.buttonGuest}
        </Link>
      </div>
    )
  } else {
    guestComp = (<div/>)
  }

  if (mode==='login') {
    loginComp = (
      <div className="login-view__login">
        <div className="login-view__login__title">
          {strings.login.labelTitle}
        </div>
        <div className="login-view__login__comment">
          {strings.login.labelComment}
        </div>
        <div className="login-view__login__email">
          <div className="input-field">
            <input id="login-view__login__email__input" type="text"/>
            <label htmlFor="login-view__login__email__input">{strings.login.labelEmail}</label>
          </div>
        </div>
        <div className="login-view__login__password">
          <div className="input-field">
            <input id="login-view__login__password__input" type="password"/>
            <label htmlFor="login-view__login__password__input">{strings.login.labelPassword}</label>
          </div>
        </div>
        <div className="login-view__login__button">
          <a
            onClick={ () => _login() }
            className="waves-effect waves-light btn-small z-depth-0"
          >
            {strings.login.buttonLogin}
          </a>
        </div>
        <div className="login-view__login__forgot-password">
          <Link
            to={`${basename}/password`}
          >
            {strings.login.labelForgotPassword}
          </Link>
        </div>
      </div>
    )

    signupComp = (
      <div className="login-view__signup">
        <div className="login-view__signup__title">
          {strings.signup.labelTitle}
        </div>
        <Link
          to={`${basename}/signup`}
          className="waves-effect waves-light btn-small z-depth-0"
          style={{'width':'100%'}}
        >
          {strings.signup.buttonSignup}
        </Link>
      </div>
    )

  } else {
    loginComp = (
      <div className="login-view__login">
        <div className="login-view__login__title">
          {strings.login.labelTitle}
        </div>
        <Link
          to={`${basename}/login`}
          className="waves-effect waves-light btn-small z-depth-0"
          style={{'width':'100%'}}
        >
          {strings.login.buttonLogin}
        </Link>
      </div>
    )

    signupComp = (
      <div className="login-view__signup">
        <div className="login-view__signup__title">
          {strings.signup.labelTitle}
        </div>
        <div className="login-view__signup__name">
          <div className="input-field">
            <input id="login-view__signup__name__input" type="text"/>
            <label htmlFor="login-view__signup__name__input">{strings.signup.labelName}</label>
          </div>
        </div>
        <div className="login-view__signup__lastname">
          <div className="input-field">
            <input id="login-view__signup__lastname__input" type="text"/>
            <label htmlFor="login-view__signup__lastname__input">{strings.signup.labelLastname}</label>
          </div>
        </div>
        <div className="login-view__signup__phone">
          <div className="input-field">
            <input id="login-view__signup__phone__input" type="text"/>
            <label htmlFor="login-view__signup__phone__input">{strings.signup.labelPhone}</label>
          </div>
        </div>
        <div className="login-view__signup__email">
          <div className="input-field">
            <input id="login-view__signup__email__input" type="text"/>
            <label htmlFor="login-view__signup__email__input">{strings.signup.labelEmail}</label>
          </div>
        </div>
        <div className="login-view__signup__password">
          <div className="input-field">
            <input id="login-view__signup__password__input" type="password"/>
            <label htmlFor="login-view__signup__password__input">{strings.signup.labelPassword}</label>
          </div>
        </div>
        <div className="login-view__signup__button">
          <a
            onClick={ () => _signup() }
            className="waves-effect waves-light btn-small z-depth-0"
          >
            {strings.signup.buttonSignup}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="login-view row">

      <div className="col s12 m12 l6">
        {loginComp}
      </div>

      <div className="col s12 m12 l6">
        {guestComp}
        {signupComp}
      </div>

    </div>
  )
}

LoginView.propTypes = {
  language: PropTypes.string.isRequired,
  basename: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  guest: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired
}

export default LoginView
