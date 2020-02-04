import React, { Component } from "react";

import { connect } from "react-redux";
import { updateUser } from "../../../store/actions/authActions";

const detailsListStyle = {
  minHeight: "70px", 
  paddingLeft: "20px", 
  lineHeight: "3rem",
  border: "1px solid #e0e0e0"
}

const formStyle = {
  margin: "0",
  marginTop: "0",
  padding: "0"
}

class AccountDetailsList extends Component {
  state = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    city: "",
    occupation: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateUser(this.state)
  };

  render() {
    const { type, icon, title } = this.props;
    let formType;
  
    if(type === "name") {
      formType = 
        (
        <form style={formStyle} onSubmit={this.handleSubmit} >
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field center" style={formStyle} >
            <button className="btn pink lighten-1 z-depth-0" style={{margin: "10px"}} >Update details</button>
          </div>
        </form>
       )
    }
  
    if(type === "date") {
      formType = 
        (<form style={formStyle} onSubmit={this.handleSubmit} >
          <div className="input">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" onChange={this.handleChange} />
          </div>
          <div className="input-field center" style={formStyle} >
            <button className="btn pink lighten-1 z-depth-0" style={{margin: "10px"}} >Update details</button>
          </div>
        </form>)
    }
  
    if(type === "city") {
      formType = 
        (<form style={formStyle} onSubmit={this.handleSubmit} >
          <div className="input-field">
            <label htmlFor="city">City</label>
            <input type="text" id="city" onChange={this.handleChange} />
          </div>
          <div className="input-field center" style={formStyle} >
            <button className="btn pink lighten-1 z-depth-0" style={{margin: "10px"}} >Update details</button>
          </div>
        </form>)
    }

    if(type === "occupation") {
      formType = 
        (<form style={formStyle} onSubmit={this.handleSubmit} >
          <div className="input-field">
            <label htmlFor="occupation">Occupation</label>
            <input type="text" id="occupation" onChange={this.handleChange} />
          </div>
          <div className="input-field center" style={formStyle} >
            <button className="btn pink lighten-1 z-depth-0" style={{margin: "10px"}} >Update details</button>
          </div>
        </form>)
    }

    return (
      <div>
        <li className="collection-item avatar" style={detailsListStyle} >
          <i className="material-icons circle" >{icon}</i>
          <span className="title">{title}</span> 
          {type === "email" 
            ? <span className="secondary-content" >click settings to change</span> 
            : <button className="secondary-content" onClick={() => this.setState({editClick: true})} ><i className="material-icons">edit</i></button>}
        </li>
        {this.state.editClick && formType}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (cred) => dispatch(updateUser(cred))
  }
};

export default connect(null, mapDispatchToProps)(AccountDetailsList);
