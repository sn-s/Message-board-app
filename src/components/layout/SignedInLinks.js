import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import "./Links.css";

class SignedInLinks extends Component {
  
  render() {
    const { isUserSignedIn, signOut, stateInitials } = this.props;
    const authExists = JSON.parse(localStorage.getItem("authData"))
    
    return (
      <ul className="right" >
        <li><NavLink className="link" to="/create" >New Message</NavLink></li>
        <li><a className="logOut" href="/" onClick={signOut} >Log Out</a></li>
        <li>
          <NavLink to={`/account/${isUserSignedIn}`} className="btn btn-floating pink lighten-1" >
            {authExists ? authExists.initials : stateInitials}
          </NavLink>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    isUserSignedIn: state.auth.isUserSignedIn,
    stateInitials: state.auth.initials
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
