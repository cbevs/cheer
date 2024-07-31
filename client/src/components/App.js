import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import SignedOutHomepage from "./landing/SignedOutHomepage";
import getRandomGreeting from "../services/getRandomGreeting";
import AuthenticatedRoute from "../components/authentication/AuthenticatedRoute.js"
import ProfilePage from "./profile/ProfilePage.js";
import CheckInPage from "./profile/CheckinPage.js";

import "../assets/scss/main.scss";

import getCurrentUser from "../services/getCurrentUser";

import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import SignedInHomePage from "./landing/SignedInHomePage.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const greeting = useRef(getRandomGreeting())

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          { !currentUser ? <SignedOutHomepage greeting={greeting.current} /> : 
          <SignedInHomePage user={currentUser} greeting={greeting.current} /> }
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile/:id" component={ProfilePage} user={currentUser} greeting={greeting.current} />
        <AuthenticatedRoute exact path="/profile/:id/checkin" component={CheckInPage} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
