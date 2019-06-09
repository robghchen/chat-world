import React, { Component } from "react";

import { userSession } from "./utils/constants";
import "./App.css";
import { Sidebar } from "./containers/Sidebar";
import { MessagesList } from "./containers/MessagesList";
import { AddMessage } from "./containers/AddMessage";
import SignButton from "./components/SignButton";

class App extends Component {
  componentDidMount = async () => {
    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      if (!userData.username) {
        throw new Error("This app requires a username");
      }
      window.location = "/";
    }
  };

  render() {
    return (
      <div id="container">
        <Sidebar />
        <SignButton />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

export default App;
