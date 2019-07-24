import React from "react";

import SignIn from "../../components/sign_in/SignIn.component";

import "./SigninPage.styles.scss";
import SignUp from "../../components/sign_up/SignUp.component";

function SignInPage() {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp/>
    </div>
  );
}

export default SignInPage;
