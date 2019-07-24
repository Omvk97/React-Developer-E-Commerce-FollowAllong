import React, { useState } from "react";

import FormInput from "../form_input/FormInput.component";
import CustomButton from "../custom_button/CustomButton.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./SignIn.styles.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
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
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
