import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import MessageDetails from "./components/messages/MessageDetails";
import CreateMessage from "./components/messages/CreateMessage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Account from "./components/auth/Account";

import { connect } from "react-redux";
import { authCheck } from "./store/actions/authActions";
import { getAuthData } from "./store/actions/authActions";

class App extends Component {

  constructor(props) {
    super(props)
    this.props.authCheck()
    const authExists = JSON.parse(localStorage.getItem("authUser"))
    if(authExists) {
      const id = authExists.uid
      this.props.getAuthData(id)
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App" >
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/message/:id" component={MessageDetails}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/create" component={CreateMessage}/>
            <Route path="/account/:id" component={Account}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
    getAuthData: (id) => dispatch(getAuthData(id))
  }
};

export default connect(null, mapDispatchToProps)(App);