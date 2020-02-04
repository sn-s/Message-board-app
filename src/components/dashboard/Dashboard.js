import React, { Component } from 'react'
import MessageList from "../messages/MessageList";
import Notifications from "./Notifications";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getFirestore, getNotificationsData } from "../../store/actions/messageActions";

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getFirestore()
    this.props.getNotificationsData()
  }

  render() {
    const { getMessages, notifications } = this.props;
    
    const authExists = JSON.parse(localStorage.getItem("authUser"))
    if(!authExists) return <Redirect to="/signin" />

    return (

      <div className="dashboard container" >
        <div className="row" >
          <div className="col s12 m6" >
            <MessageList messages={getMessages} /> 
          </div>

          <div className="col s12 m5 offset-m1" >
            <Notifications notifications={notifications} />
          </div>

        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.auth.isUserSignedIn,
    getMessages: state.message.getMessages,
    singOutMessage: state.auth.singOutMessage,
    notifications: state.message.notifications
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirestore: () => dispatch(getFirestore()),
    getNotificationsData: () => dispatch(getNotificationsData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);