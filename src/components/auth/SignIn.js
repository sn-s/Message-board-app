import React, { Component } from "react";

import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state, this.props.history)
  };

  render() {
    const { isUserSignedIn, signInError } = this.props;
    
    const authExists = JSON.parse(localStorage.getItem("authUser"))
    if(isUserSignedIn || authExists) return <Redirect to="/" />

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit} >
          <h5 className="grey-text text-darken-3">Sign in</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0" >Login</button>
            <div className="red-text center" >
              {signInError && <p>{signInError}</p>}
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
    signInError: state.auth.signInError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred, history) => dispatch(signIn(cred, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);