import React, { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "./../components/registerForm";

const LandingPage = () => {
  const [registered, setRegistered] = useState(true);
  const handleClick = () => {
    setRegistered(!registered);
  };
  return (
    <div className="landing">
      <div className="landing-header">
        <div className="landing-text">
          <label className="label-animation"> CloudPress </label>
          <p className="p-animation">
            {" "}
            Easiest way to deploy your wordpress website to the cloud{" "}
          </p>
        </div>
        <div className="landing-form">
          {registered ? (
            <div>
              <LoginForm />
              <p onClick={handleClick}> New user ? click here to register.</p>
            </div>
          ) : (
            <div>
              <RegisterForm />
              <p onClick={handleClick}>
                {" "}
                Already registered ? click here to log-in.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
