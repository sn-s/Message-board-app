import React, {Component} from "react";

import { connect } from "react-redux";
import { addMessage } from "../../store/actions/messageActions";

class CreateMessage extends Component {
  state = {
    title: "",
    content: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.title && this.state.content) {
      this.props.addMessage(this.state);
      this.props.history.push("/");
    }
  };

  render() {

    return (
      <div className="container" onSubmit={this.handleSubmit} >
        <form className="grey white">
          <h5 className="grey-text text-darken-3">Create new message</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Message content</label>
            <textarea className="materialize-textarea" style={{padding: "0.7rem"}}  id="content" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Post</button>
          </div>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (input) => dispatch(addMessage(input))
  }
};

export default connect(null, mapDispatchToProps)(CreateMessage);

