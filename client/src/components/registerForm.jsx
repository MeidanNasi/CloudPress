import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import { register } from ".././services/userService";

class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", email: "", password: "" },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const user = await register(this.state.data);
      this.props.history.push("/profile");
    } catch (error) {
      console.log(error);
      alert("User already exsits.");
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
