import React from "react";

const SignButton = ({ userSession }) =>
  userSession.isUserSignedIn() ? (
    <button id="sign-out" onClick={() => handleSignOut(userSession)}>
      <strong>Sign Out</strong>
    </button>
  ) : (
    <button id="sign-in" onClick={() => handleSignIn(userSession)}>
      <strong>Sign In</strong>
    </button>
  );

const handleSignIn = userSession => {
  userSession.redirectToSignIn();
};
const handleSignOut = userSession => {
  userSession.signUserOut();
  window.location = "/";
};

export default SignButton;
