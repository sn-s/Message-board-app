import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.css";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = ({ isUserSignedIn }) => {
  const authExists = JSON.parse(localStorage.getItem("authUser"))
  const navLinks = (authExists || isUserSignedIn) ? <SignedInLinks /> : <SignedOutLinks />
  
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left" >Chit-Chat</Link>
        {navLinks}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.auth.isUserSignedIn
  }
};

export default connect(mapStateToProps)(Navbar);
