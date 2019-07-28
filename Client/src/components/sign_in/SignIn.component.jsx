import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form_input/FormInput.component";
import CustomButton from "../custom_button/CustomButton.component";

import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.actions";

import "./SignIn.styles.scss";

function SignIn({ googleSignInStart, emailSignInStart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    emailSignInStart(email, password);
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
          onChange={event => setEmail(event.target.value)}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
