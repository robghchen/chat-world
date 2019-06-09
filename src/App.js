import React, { Component } from "react";
import { UserSession } from "blockstack";

import { appConfig } from "./utils/constants";
import "./App.css";
import { Sidebar } from "./containers/Sidebar";
import { MessagesList } from "./containers/MessagesList";
import { AddMessage } from "./containers/AddMessage";
import SignButton from "./components/SignButton";

class App extends Component {
  state = {
    userSession: new UserSession({ appConfig })
  };

  componentDidMount = async () => {
    const { userSession } = this.state;
    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      if (!userData.username) {
        throw new Error("This app requires a username");
      }
      window.location = "/";
    }
  };

  render() {
    const { userSession } = this.state;
    return (
      <div id="container">
        <Sidebar />
        <SignButton userSession={userSession} />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

export default App;
