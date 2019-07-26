import React, { useState } from "react";
import { connect } from "react-redux";

import "./SignUp.styles.scss";

import FormInput from "../form_input/FormInput.component";
import CustomButton from "../custom_button/CustomButton.component";

import { signUpStart } from "../../redux/user/user.actions";

function SignUp({signUpStart}) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    signUpStart(displayName, email, password);

    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={event => setDisplayName(event.target.value)}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (displayName, email, password) =>
    dispatch(signUpStart({ displayName, email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
