import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import M from "materialize-css";
import moment from "moment";

import { connect } from "react-redux";
import { deleteMessage } from "../../store/actions/messageActions";


class MessageSummary extends Component {

  componentDidMount() {
    const elems = document.querySelectorAll('.modal');
    const options = {} 
    M.Modal.init(elems, options)
  }
  
  handleClick = () => { 
    const { messageId, deleteMessage } = this.props;
    deleteMessage(messageId)
    this.props.history.push("/")
  }

  render() {
    const { messages, deleteBtn, messageId, history } = this.props;
    return (
      <div>
        <div className="row valign-wrapper" style={{cursor: "pointer"}} >
          <div className="message-summary card z-depth-3 col s11" 
            onClick={() => history.push(`/message/${messageId}`)} >
            <div className="card-content grey-text text-darken-3"> 
              <span className="card-title" style={{wordWrap: "break-word"}} >{messages.title}</span>
              <p>Posted by {messages.authorFirstName} {messages.authorLastName}</p>
              <p className="grey-text">{moment(messages.createdAt.toDate()).calendar()}</p>
            </div>
          </div>

          <div className="col s1 ">
          {deleteBtn && 
            <button 
              className="btn-floating btn-small red modal-trigger"
              data-target="modal1"
              >
                <i className="material-icons">clear</i>
            </button>}
          </div>

        </div>        

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Delete message</h4>
            <p>Are you sure you want to delete the message?</p>
          </div>
          <div className="modal-footer">
            <button 
              className="modal-close waves-effect btn-flat red white-text"
              onClick={this.handleClick}>Yes</button>
          </div>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (id) => dispatch(deleteMessage(id))
  }
};

export default connect(null, mapDispatchToProps)(withRouter(MessageSummary));
