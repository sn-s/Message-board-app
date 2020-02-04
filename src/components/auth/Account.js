import React, { Component } from "react";
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import MessageSummary from "../messages/MessageSummary";
import AccountDetailsList from "../subcomponents/accountComponents/AccountDetailsList";

import { connect } from "react-redux";
import { getFirestore } from "../../store/actions/messageActions"; 
import { deleteUser, updateEmailFunction, updatePasswordFunction } from "../../store/actions/authActions";

const borderStyle = {
  borderTop: "2px solid #ec407a",
  borderBottom: "2px solid #ec407a"
}

const formStyle = {
  margin: "0",
  marginTop: "0",
  padding: "0"
}

class Account extends Component {
  state = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    city: "",
    oldPassword: "",
    newEmail: "",
    newPassword: "",
    newPassword2: "",
    passwordMissmatch: ""
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.collapsible');
    const options = {} 
    M.Collapsible.init(elems, options);    
    this.props.getFirestore()
    const elems2 = document.querySelectorAll('.modal');
    const options2 = {} 
    M.Modal.init(elems2, options2)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateUser(this.state)
  }

  handleEmailSubmit = (e) => {
    e.preventDefault()
    this.props.updateEmailFunction(this.state.oldPassword, this.state.newEmail)
  }
  
  handlePasswordSubmit = (e) => {
    e.preventDefault()
    if(this.state.newPassword === this.state.newPassword2) {
      this.props.updatePasswordFunction(this.state.oldPassword, this.state.newPassword)
      this.setState({passwordMissmatch: ""})
    } else {
      this.setState({passwordMissmatch: " Passwords do not match."})
    }
  }

  render() {
    const { userData, filteredMessages, deleteUser, emailError, passwordError } = this.props;
    const authExists = JSON.parse(localStorage.getItem("authUser"))
    if(!authExists) return <Redirect to="/signin" />

    return (
      <div className="container" style={{marginTop: "50px", width: "750px"}} >

        <ul className="collapsible">
          <li className="active center-align">
            <div className="collapsible-header grey lighten-3"><i className="material-icons">account_circle</i>My details</div>
            <div className="collapsible-body white" style={borderStyle} >

              <div>
                <ul className="collection" style={{padding: "0px"}} >
                  <AccountDetailsList type="name" icon="person" title={userData && `${userData.firstName} ${userData.lastName}`} />
                  <AccountDetailsList type="email" icon="email" title={userData && userData.email} />
                  <AccountDetailsList type="date" icon="cake" title={userData && userData.dateOfBirth} />
                  <AccountDetailsList type="city" icon="location_city" title={userData && userData.city} />
                  <AccountDetailsList type="occupation" icon="work" title={userData && userData.occupation} />  

                </ul>
              </div>

            </div>
          </li>

          <li>
            <div className="collapsible-header grey lighten-3"><i className="material-icons">message</i>My messages</div>
            <div className="collapsible-body white" style={borderStyle}>
              {filteredMessages && filteredMessages.map(item => (
                  <MessageSummary key={item.id} messages={item.data} messageId={item.id} deleteBtn={"deleteBtn"} />
              )) }
            </div>
          </li>

          <li>
            <div className="collapsible-header grey lighten-3"><i className="material-icons">settings</i>Settings</div>
            <div className="collapsible-body white" style={borderStyle}> 
              <div className="center" >
                <h5 >Change email
                <button 
                  style={{margin: "15px", backgroundColor: "#ec407a"}}
                  className="btn-small" onClick={() => this.setState({emailClick: true})} >Yes
                </button>
                </h5>
                { this.state.emailClick && <form style={formStyle} onSubmit={this.handleEmailSubmit} > 
                    <div className="input-field">
                      <label htmlFor="oldPassword">Password</label>
                      <input type="password" id="oldPassword" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                      <label htmlFor="newEmail">New email</label>
                      <input type="email" id="newEmail" onChange={this.handleChange} />
                    </div>
                    <div className="input-field center" >
                      <button className="btn pink lighten-1 z-depth-0">Submit</button>
                    </div>
                    <div className="red-text center" >
                      <div>
                        {emailError && emailError}
                        {passwordError && passwordError}
                      </div>
                    </div>
                  </form>}
              </div>
              <div className="center" >
                <h5>Change password
                <button 
                  style={{margin: "15px", backgroundColor: "#ec407a"}}
                  className="btn-small" onClick={() => this.setState({passwordClick: true})} >Yes
                </button>
                </h5>
                { this.state.passwordClick && <form style={formStyle} onSubmit={this.handlePasswordSubmit} > 
                  <div className="input-field">
                    <label htmlFor="oldPassword">Old password</label>
                    <input type="password" id="oldPassword" onChange={this.handleChange} />
                  </div>
                  <div className="input-field">
                    <label htmlFor="newPassword">New password</label>
                    <input type="password" id="newPassword" onChange={this.handleChange} />
                  </div>
                  <div className="input-field">
                    <label htmlFor="newPassword">Confirm new password</label>
                    <input type="password" id="newPassword2" onChange={this.handleChange} />
                  </div>
                  <div className="input-field center" >
                    <button className="btn pink lighten-1 z-depth-0">Submit</button>
                  </div>
                  <div className="red-text center" >
                      {passwordError && passwordError}
                      {this.state.passwordMissmatch && this.state.passwordMissmatch}
                    </div>
                </form>}
              </div>
              <div className="center" >
                <h5>Delete account
                <button 
                  style={{margin: "15px"}}
                  className="btn-small red modal-trigger"
                  data-target="modal1" >Yes
                </button>
                </h5>
              </div>
            </div>
          </li>

        </ul>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Delete account</h4>
            <p>Are you sure you want to delete your account?</p>
          </div>
          <div className="modal-footer">
            <button 
              className="modal-close waves-effect btn-flat red white-text"
              onClick={() => deleteUser()} >
              Yes
            </button>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const messages = state.message.getMessages
  const filteredMessages = messages && messages.filter(item => item.data.authorId === id)
  return {
    userData: state.auth.userData,
    filteredMessages: filteredMessages,
    emailError: state.auth.emailError,
    passwordError: state.auth.passwordError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirestore: () => dispatch(getFirestore()),
    deleteUser: () => dispatch(deleteUser()),
    updateEmailFunction: (oldPassword, newEmail) => dispatch(updateEmailFunction(oldPassword, newEmail)),
    updatePasswordFunction: (oldPassword, newPassword) => dispatch(updatePasswordFunction(oldPassword, newPassword))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);