import React from "react";

import { userSession } from "../utils/constants";

const SignButton = props =>
  userSession.isUserSignedIn() ? (
    <button
      id="sign-out"
      className="pointer"
      onClick={handleSignOut}
    >
      <strong>Sign Out</strong>
    </button>
  ) : (
    <button
      id="sign-in"
      className="pointer"
      onClick={handleSignIn}
    >
      <strong>Sign In</strong>
    </button>
  );

const handleSignIn = () => {
  userSession.redirectToSignIn();
};
const handleSignOut = () => {
  userSession.signUserOut();
  window.location = "/";
};

export default SignButton;
