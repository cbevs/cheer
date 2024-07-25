import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SignedOutHomepage = ({ greeting }) => {

  return (
    <>
      <div className="landing-1">
        <h1 className="landing-text">{greeting}! How are you?</h1>
        <a href="#l2" className="scroll-icon"><FontAwesomeIcon icon="fa-solid fa-angles-down" /></a>
      </div>
      <div className="landing-2" id="l2">
        <div className="landing-2-left">
          <h2 className="font-1 text-c color-1 welcome-text">Welcome to Cheer!</h2>
          <div className="welcome-desc">
            <p className="landing-p1">Feeling some sort of way but can't quite put a pin on why?</p>
            <p>Grumpy? Sad? Tired? Some feeling you can't quite put into words? Give Cheer a try!</p>
            <p className="bm-3"> Cheer's goal is to help you find why you are feeling the way you are and assist in identifying potential triggers.</p>
          </div>
        </div>
        <div className="landing-2-right">
          <h2 className="font-1 text-c landing-r-text welcome-text">Find cheer in your every day!</h2>
          <Link to="/users/new" className="sign-up-link">Sign Up Now!</Link>
        </div>
      </div>
    </>
  )
}

export default SignedOutHomepage