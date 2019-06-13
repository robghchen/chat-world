import React, { Component } from "react";

import { userSession } from "../utils/blockstack";
import { compDidUp } from "../utils/googleTranslate";

class SignButton extends Component {
  state = { str: userSession.isUserSignedIn() ? "Sign Out" : "Sign In" };

  // componentDidUpdate() {
  //   let { str } = this.state;

  //   const translating = tranStr => {
  //     if (str !== tranStr) {
  //       this.setState({ str: tranStr });
  //     }
  //   };

  //   compDidUp(str, translating);
  // }

  render() {
    const { str } = this.state;

    return (
      <div>
        {userSession.isUserSignedIn() ? (
          <button id="sign-out" className="pointer" onClick={handleSignOut}>
            <strong>{str}</strong>
          </button>
        ) : (
          <button id="sign-in" className="pointer" onClick={handleSignIn}>
            <strong>{str}</strong>
          </button>
        )}
      </div>
    );
  }
}

const handleSignIn = () => {
  userSession.redirectToSignIn();
};
const handleSignOut = () => {
  userSession.signUserOut();
  window.location = "/";
};

export default SignButton;
