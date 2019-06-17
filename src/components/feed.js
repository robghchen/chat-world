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
    // translated: false
  };

  componentWillMount() {
    const rawMessages = this.props.messages;
    const messages = rawMessages.map(message => {
      return new Message(message.attrs);
    });
    this.setState({ messages });
  }

  componentDidMount() {
    // const { translated } = this.state;
    const { messages } = this.props;

    this.setState({
      currentUser: User.currentUser()
    });

    // if (!translated) {
    //   console.log("translating");
    //   this.setState({ translated: true });
    //   messages.forEach(message => this.translateMessage(message));
    // }

    Message.addStreamListener(this.newMessageListener.bind(this));
  }

  // translateMessage = async message => {
  //   const { language } = this.state;

  //   if (
  //     message.attrs.language !== language &&
  //     !message.attrs.translation[language]
  //   ) {
  //     message.attrs.translation[language] = await translate(
  //       message.attrs.content,
  //       {
  //         from: message.attrs.language,
  //         to: language,
  //         key: apiKey
  //       }
  //     );
  //     await message.save();
  //   }
  // };

  async newMessageListener(message) {
    const { language } = this.state;

    if (
      message.attrs.language !== language &&
      !message.attrs.translation[language]
    ) {
      message.attrs.translation[language] = await translate(
        message.attrs.content,
        {
          from: message.attrs.language,
          to: language,
          key: apiKey
        }
      );
      await message.save();
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
            {author.slice(-14, author.length) === ".id.blockstack"
              ? author.slice(0, -14)
              : author}
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
    this.setState({ language });
  };

  render() {
    return (
      <Flex>
        <Box width={[1, 1 / 2]} mx="auto" textAlign="center">
          {/* <Text.p textAlign="center">Create a post:</Text.p> */}

          {this.messages()}

          {/* <Text.p textAlign="center">
            Only showing the most recent {this.state.messages.length} messages.
          </Text.p> */}

          <SelectLanguage changeLanguage={this.changeLanguage} />

          <Input
            mt={3}
            width={1}
            placeholder="Type a message..."
            value={this.state.newMessage}
            onChange={evt => this.setState({ newMessage: evt.target.value })}
          />

          <Button onClick={() => this.submit()} mt={2}>
            Submit
          </Button>
        </Box>
      </Flex>
    );
  }
}
