import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = <Link to="/user-sessions/new">Sign In</Link>
  

  const authenticatedListItems = <SignOutButton />
  

  return (
    <>
      <div className="nav-bar">
        <span className="nav-left"><Link to="/" className="home-link">Home</Link></span>

        <Link to="/" className="text-c">
          <img src="https://cheer-production.s3.us-east-2.amazonaws.com/cheerLogo.png" alt="cheer-logo" className="top-bar-logo" />
        </Link>

        <span className="nav-right">{user ? authenticatedListItems : unauthenticatedListItems}</span>
        
      </div>
      </>
  );
};

export default TopBar;
