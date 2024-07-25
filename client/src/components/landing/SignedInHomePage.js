import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SignedInHomePage = ({ user, greeting }) => {

  return (
    <>
      <div className="landing-1">
        <h1 className="landing-text">{greeting}, {user.username}!</h1>
      </div>
      <div className="landing-2" id="l2">
        <div className="landing-2-left">
          <h2 className="font-1 text-c color-1 welcome-text">Welcome to Cheer!</h2>
        </div>
        <div className="landing-2-right">
          
        </div>
      </div>
    </>
  )
}

export default SignedInHomePage