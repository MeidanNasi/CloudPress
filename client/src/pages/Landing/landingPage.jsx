import React, { useState, useEffect } from "react";

import LoginForm from "../../components/loginForm";
import RegisterForm from "../../components/registerForm";

import { Button, Modal } from "react-bootstrap";

import "./landing.css";

const LandingPage = (props) => {
  const [show, setShow] = useState(false);
  const [registered, setRegistered] = useState(true);

  const handleClick = () => {
    setRegistered(!registered);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (sessionStorage.getItem("token")) props.history.push("/profile");
  }, []);

  return (
    <div className="landing">
      <div className="landing-header">
        <div className="landing-text">
          <h1> CloudPress </h1>
          <label>
            Easiest way to deploy your wordpress website to the cloud.
          </label>

          <p id="p1"> What is cloud?</p>
          <p id="p2">
            {" "}
            "The cloud" refers to servers that are accessed over the Internet,
            and the software and databases that <br /> run on those servers.
            Cloud servers are located in data centers all over the world. By
            using cloud <br /> computing, users and companies don't have to
            manage physical servers themselves or run software <br />{" "}
            applications on their own machines.
          </p>
          <p id="p1"> Why CloudPress?</p>
          <p id="p2">
            {" "}
            Simplest, Quickest & Carefree way to deploy your wordpress site to
            the cloud. <br /> Zero messing from you in deployment, our
            beast-automative system will take care of anything you need and
            store your website in AWS servers, just by a CLICK of a button.{" "}
          </p>
          <Button variant="outline-light btn-lg" onClick={handleShow}>
            Login / Register
          </Button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {registered ? (
              <div>
                <LoginForm history={props.history} />
                <p id="warning" onClick={handleClick}>
                  {" "}
                  New user ? click here to register.
                </p>
              </div>
            ) : (
              <div>
                <RegisterForm history={props.history} />
                <p id="warning" onClick={handleClick}>
                  {" "}
                  Already registered ? click here to log-in.
                </p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default LandingPage;
