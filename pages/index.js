import React from "react";
import { Flex, Box, Button } from "rebass";
import PropTypes from "prop-types";
import { User, getConfig } from "radiks";
import cookie from "react-cookies";

import Text from "../styled/typography";
import Message from "../models/Message";
import AppUser from "../models/AppUser";
import Feed from "../src/components/Feed";
import Sidebar from "../src/components/Sidebar";

class Home extends React.Component {
  _isMounted = false;

  static propTypes = {
    messages: PropTypes.array,
    users: PropTypes.array
  };

  static defaultProps = {
    messages: [],
    users: []
  };

  state = {
    currentUser: null,
    messages: [],
    users: [],
    createdUserIDs: {},
    language: cookie.load("language")
  };

  static async getInitialProps() {
    const messages = await Message.fetchList(
      {
        sort: "-createdAt",
        limit: 10
      },
      { decrypt: false }
    );

    const users = await AppUser.fetchList(
      {
        sort: "-createdAt",
        limit: 20
      },
      { decrypt: false }
    );

    return {
      messages,
      users
    };
  }

  componentWillMount() {
    this.is_Mounted = true;

    if (this._isMounted) {
      const rawUsers = this.props.users;
      const users = rawUsers.map(user => {
        return new User(user.attrs);
      });
      this.setState({ users });
    }

    // console.log("compDidMount", this.props.messages);
  }

  async componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      AppUser.addStreamListener(this.newUserListener.bind(this));
    }

    const { userSession } = getConfig();
    if (userSession.isUserSignedIn()) {
      const currentUser = userSession.loadUserData();
      this.setState({ currentUser });
      if (this._isMounted) {
        setTimeout(() => this.submitUser(currentUser), 1000);
      }
    } else if (userSession.isSignInPending()) {
      const currentUser = await userSession.handlePendingSignIn();
      await User.createWithCurrentUser();
      this.setState({ currentUser });
    }

    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async newUserListener(user) {
    const { users } = this.state;
    if (!this.state.createdUserIDs[user._id]) {
      users.push(user);
      this.setState({ users });
    }
  }

  async submitUser(currentUser) {
    const { language } = this.state;
    const user = new User({
      username: currentUser.username,
      online: true,
      language: language
    });
    const { users, createdUserIDs } = this.state;
    users.push(user);
    createdUserIDs[user._id] = true;
    this.setState({ users, createdUserIDs });
    await user.save();
  }

  login = () => {
    const { userSession } = getConfig();
    userSession.redirectToSignIn();
  };

  logout = () => {
    const { userSession } = getConfig();
    userSession.signUserOut();
    this.setState({
      currentUser: null
    });
  };

  changeLanguage = language => {
    this.setState({ language });
  };

  render() {
    const { currentUser, users } = this.state;
    const { messages } = this.props;

    messages.sort((a, b) => a.attrs.createdAt - b.attrs.createdAt);

    console.log("createdUserIDs", this.state.createdUserIDs);
    return (
      <>
        <Flex>
          <Box width={[1, 9 / 10]} mx="auto">
            <Text.h1 textAlign="center">Chat World</Text.h1>
            <Text.p textAlign="center">Real-time text translation</Text.p>
            {currentUser ? (
              <>
                <Button
                  mt={3}
                  onClick={this.logout}
                  mx="auto"
                  style={{
                    display: "block",
                    fontSize: "1em",
                    cursor: "pointer",
                    position: "absolute",
                    top: "2em",
                    right: "5em"
                  }}
                >
                  Log Out
                </Button>
                <br />
                <hr />
                <div style={{ display: "flex" }}>
                  <Sidebar users={users} />
                  <Feed
                    messages={messages}
                    changeLanguage={this.changeLanguage}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  alt="banner"
                  style={{
                    backgroundImage:
                      'url("https://1.bp.blogspot.com/-4f6FJ6qKOq4/XKRZY0BVxCI/AAAAAAAABS8/lq3RXjvKLiMYQ5O5KhdVfYYcNVQeKU1EACLcBGAs/s1600/cursos-de-ingles-en-el-extranjero.jpg")',
                    minWidth: "100vw",
                    minHeight: "50vh",
                    position: "absolute",
                    top: "0em",
                    left: "0em",
                    display: "flex"
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      color: "white",
                      padding: "2em",
                      borderRadius: "2em",
                      backgroundColor: "rgba(0,0,0,0.5"
                    }}
                  >
                    <h1 style={{ textAlign: "center" }}>Chat World</h1>
                    <h2>
                      Real-time text translation chat app to overcome language
                      barriers
                    </h2>

                    <Button
                      mt={3}
                      onClick={this.login}
                      mx="auto"
                      style={{
                        display: "block",
                        padding: "0.7em",
                        borderRadius: "0.6em",
                        fontSize: "1.5em",
                        cursor: "pointer"
                      }}
                    >
                      Log In
                    </Button>
                  </div>

                  <img
                    src="https://i.ibb.co/R4czc1w/2019-06-12-15-00-11.gif"
                    alt="demo"
                    style={{
                      maxWidth: "100vw",
                      minHeight: "50vh",
                      position: "absolute",
                      marginTop: "50vh",
                      left: "0em"
                    }}
                  />
                </div>
              </>
            )}
          </Box>
        </Flex>
      </>
    );
  }
}

export default Home;
