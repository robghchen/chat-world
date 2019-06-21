import React from "react";
import { Flex, Box, Button } from "rebass";
import PropTypes from "prop-types";
import { User } from "radiks";
import translate from "translate";
import cookie from "react-cookies";

import SelectLanguage from "./SelectLanguage";

import { langCodes, apiKey } from "../utils/translate";

import Text from "../../styled/typography";
import Input from "../../styled/input";
import Message from "../../models/Message";

export default class Feed extends React.Component {
  _isMounted = false;

  static propTypes = {
    messages: PropTypes.array
  };

  static defaultProps = {
    messages: []
  };

  state = {
    newMessage: "",
    createdMessageIDs: {},
    messages: [],
    currentUser: null,
    languageCodes: langCodes,
    language: cookie.load("language")
  };

  componentWillMount() {
    this._isMounted = true;

    if (this._isMounted) {
      const rawMessages = this.props.messages;
      const messages = rawMessages.map(message => {
        return new Message(message.attrs);
      });
      this.setState({ messages });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({
        currentUser: User.currentUser()
      });

      Message.addStreamListener(this.newMessageListener.bind(this));
    }
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async newMessageListener(message) {
    const { language } = this.state;

    if (
      message.attrs.language !== language &&
      !message.attrs.translation[language]
    ) {
      try {
        message.attrs.translation[language] = await translate(
          message.attrs.content,
          {
            from: message.attrs.language,
            to: language,
            key: apiKey
          }
        );
        await message.save();
      } catch (err) {
        alert(err);
      }
    } else {
      this.pushMessage(message);
    }
  }

  pushMessage = message => {
    const { messages } = this.state;

    if (!this.state.createdMessageIDs[message._id]) {
      messages.push(message);
      this.setState({ messages });
    }
  };

  async submit() {
    const { newMessage, language } = this.state;
    const message = new Message({
      content: newMessage,
      createdBy: this.state.currentUser._id,
      language: language,
      translation: {}
    });
    const { messages, createdMessageIDs } = this.state;
    messages.push(message);
    createdMessageIDs[message._id] = true;
    this.setState({ messages, createdMessageIDs, newMessage: "" });
    await message.save();
  }

  messages() {
    const { language } = this.state;
    return this.state.messages.map(message => {
      let author = message.attrs.createdBy;
      return (
        <div key={message._id}>
          <Text.p mt={4} mb={1}>
            <img
              src={`./assets/flags/${author.language}.png`}
              alt={author.language}
            />{" "}
            <strong>
              {author.slice(-14, author.length) === ".id.blockstack"
                ? author.slice(0, -14)
                : author}
            </strong>
            :{" "}
            {message.attrs.translation[language]
              ? message.attrs.translation[language]
              : message.attrs.content}
          </Text.p>
        </div>
      );
    });
  }

  changeLanguage = language => {
    this.props.changeLanguage(language);

    this.setState({ language });
  };

  render() {
    return (
      <div style={{ flex: "3" }}>
        <Flex>
          <Box width={[1, 1]} mx="auto" textAlign="center" marginbottom="1.5em">
            {/* <Text.p textAlign="center">Create a post:</Text.p> */}

            {this.messages()}

            {/* <Text.p textAlign="center">
            Only showing the most recent {this.state.messages.length} messages.
          </Text.p> */}

            <Input
              mt={3}
              width={7 / 10}
              placeholder="Type a message..."
              value={this.state.newMessage}
              onChange={e => this.setState({ newMessage: e.target.value })}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  return this.submit();
                }
              }}
            />

            <SelectLanguage changeLanguage={this.changeLanguage} />

            <Button
              style={{ marginTop: "-0.2em", height: "2.5em" }}
              onClick={() => this.submit()}
              mt={2}
            >
              Submit
            </Button>
          </Box>
        </Flex>
      </div>
    );
  }
}
