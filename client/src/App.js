import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";
import Profile from './pages/Profile/profilePage';
import LandingPage from './pages/Landing/landingPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
