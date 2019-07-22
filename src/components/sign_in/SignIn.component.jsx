import React, { useState } from "react";

import FormInput from "../form_input/FormInput.component";
import CustomButton from "../custom_button/CustomButton.component";

import "./SignIn.styles.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setEmail("");
    setPassword("");
  }

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={event => setEmail(event.target.value)}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={event => setPassword(event.target.value)}
          label="password"
          required
        />
        <CustomButton type="submit">Sign In</CustomButton>
      </form>
    </div>
  );
}

export default SignIn;
