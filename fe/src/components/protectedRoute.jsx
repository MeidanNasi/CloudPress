import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from '../services/authService'
const ProtectedRoute = ({ component: Component, path,  render, ...rest }) => {
  return (
    <Route
      {...rest} // includes path.
      render={props => {
        if (!auth.getCurrentUser()) // in case a user isnt authenticated, redirect him to landingpage. 
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

