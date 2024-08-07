import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ChartExample from "./ChartExample";

const SignedOutHomepage = ({ greeting }) => {

  return (
    <>
      <div className="landing-1">
        <p className="landing-text">{greeting}! How are you?</p>
        <a href="#l2" className="scroll-icon"><FontAwesomeIcon icon="fa-solid fa-hand-holding-heart" /></a>
      </div>
      <div className="landing-2" id="l2">
        <div className="landing-2-left">
          <p className="font-1 text-c color-1 welcome-text">Welcome to Cheer!</p>
          <div className="welcome-desc">
            <p className="landing-p1 p1-bd">Feeling some sort of way but can't quite put a pin on why?</p>
            <p className="p2-bd">Using Cheer, log how you are feeling and find trends in your moods.</p>
            <p className="bm-3 p3-bd">Add comments to your daily check in and see how certain factors affect your mood.</p>
          </div>
        </div>
        <div className="landing-2-right">
          <p className="font-1 text-c color-1 welcome-text">Find cheer in your every day!</p>
          <Link to="/users/new" className="sign-up-link">Sign Up Now!</Link>
          <ChartExample />
        </div>
      </div>
    </>
  )
}

export default SignedOutHomepage