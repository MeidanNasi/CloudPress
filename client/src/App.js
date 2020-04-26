import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import LandingPage from "./pages/landing";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
