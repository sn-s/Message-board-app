import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    city: "",
    occupation: "",
    passwordError: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.password === this.state.password2) {
      this.props.signUp(this.state, this.props.history)
    } else {
      this.setState({passwordError: "Passwords do not match."})
    }
  };

  render() {
    const { isUserSignedIn, signUpError } = this.props;

    const authExists = JSON.parse(localStorage.getItem("authUser"))
    if(isUserSignedIn || authExists) return <Redirect to="/" />

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit} >
          <h5 className="grey-text text-darken-3">Sign up</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" required onChange={this.handleChange} />
          </div>
          <div className="input">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="city">City</label>
            <input type="text" id="city" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="occupation">Occupation</label>
            <input type="text" id="occupation" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" id="password2" required onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign up</button>
            <div className="red-text center" >
              {signUpError && <p style={{marginTop: "0px"}} >{signUpError}</p>}
              {this.state.passwordError && <p style={{marginTop: "0px"}} >{this.state.passwordError}</p>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.auth.isUserSignedIn,
    signUpError: state.auth.signUpError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (cred, history) => dispatch(signUp(cred, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);