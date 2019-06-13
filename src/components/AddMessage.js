import React, { Component } from "react";
import PropTypes from "prop-types";

import { compDidUp } from "../utils/googleTranslate";

class AddMessage extends Component {
  state = { str: "Type a message..." };

  // componentDidUpdate() {
  //   console.log("AddMessage.js") // this one is not working
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
    let input;

    return (
      <section id="new-message">
        <input
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.props.dispatch(input.value, "Me");
              input.value = "";
            }
          }}
          type="text"
          placeholder={str}
          ref={node => {
            input = node;
          }}
        />
      </section>
    );
  }
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AddMessage;
