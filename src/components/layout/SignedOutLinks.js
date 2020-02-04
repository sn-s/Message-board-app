import React from "react";
import { NavLink } from "react-router-dom";
import "./Links.css";

const SignedOutLinks = () => {
  return (
    <ul className="right" >
      <li>
        <NavLink className="link" to="/signin">Login</NavLink>
      </li>
      <li>
        <NavLink className="link" to="/signup">Sign up</NavLink>
      </li>
    </ul>
  )
}

export default SignedOutLinks;