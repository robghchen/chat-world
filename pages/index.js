import React from "react";
import { Flex, Box, Button } from "rebass";
import PropTypes from "prop-types";
import { User, getConfig } from "radiks";

import Text from "../styled/typography";
import Message from "../models/Message";
import Feed from "../src/components/Feed";

class Home extends React.Component {
  static propTypes = {
    messages: PropTypes.array
  };

  static defaultProps = {
    messages: []
  };

  state = {
    currentUser: null
  };

  static async getInitialProps() {
    const messages = await Message.fetchList(
      {
        sort: "-createdAt",
        limit: 10
      },
      { decrypt: false }
    );

    return {
      messages
    };
  }

  async componentDidMount() {
    const { userSession } = getConfig();
    if (userSession.isUserSignedIn()) {
      const currentUser = userSession.loadUserData();
      this.setState({ currentUser });
    } else if (userSession.isSignInPending()) {
      const currentUser = await userSession.handlePendingSignIn();
      await User.createWithCurrentUser();
      this.setState({ currentUser });
    }
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

  render() {
    const { currentUser } = this.state;
    return (
      <>
        <Flex>
          <Box width={[1, 3 / 4]} mx="auto">
            <Text.h1 textAlign="center">Chat World</Text.h1>
            {currentUser ? (
              <>
                <Text.small textAlign="center" display="block">
                  Logged in as {currentUser.username}
                  {". "}
                  <a href="javascript:void(0)" onClick={this.logout}>
                    Log Out
                  </a>
                </Text.small>
                <Feed
                  messages={this.props.messages.sort(
                    (a, b) => a.attrs.createdAt - b.attrs.createdAt
                  )}
                />
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
