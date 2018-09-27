import React from 'react'

/** actions */

import style from './jordi.scss'

import { jordiInit } from './model.js'

const strings = {
  ES:require('./strings/jordi.ES.json'),
  EN:require('./strings/jordi.EN.json')
}

class Jordi extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    jordiInit()
  }

  render() {
    return(
      <div className="jordi">
        <div className="chatCont" id="chatCont">
					<div className="bot_profile">
            <img src="./images/bot2.svg" className="bot_p_img"/>
						<div className="close">
							<i className="small material-icons">close</i>{ /** <i className="fa fa-times" aria-hidden="true"></i> */}
						</div>
					</div>
					<div id="result_div" className="resultDiv"></div>
					<div className="chatForm" id="chat-div">
						<div className="spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
						<input type="text" id="chat-input" autoComplete="off" placeholder="Try typing here" className="browser-default form-control bot-txt"/>
					</div>
				</div>

				<div className="profile_div">
					<div className="row">
						<div className="col-hgt">
              <img src="./images/bot2.svg" className="img-circle img-profile"/>
						</div>
						<div className="col-hgt">
							<div className="chat-txt">
								Chat with us now!
							</div>
						</div>
					</div>
				</div>
      </div>
    )
  }
}

export default Jordi
//<img src="assets/img/bot2.svg" className="bot_p_img">
//<img src="assets/img/bot2.svg" className="img-circle img-profile">
