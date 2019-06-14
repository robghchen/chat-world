import React, { Component } from "react";
import PropTypes from "prop-types";

import { googleTranslate, compDidUp } from "../utils/googleTranslate";
import cookie from "react-cookies";
import { parse } from "querystring";

class LanguagePopup extends Component {
  state = {
    languageCodes: [],
    str: "What language do you prefer to read with?"
  };

  componentDidMount() {
    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      getLanguageCodes(languageCodes);
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

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
    const { languageCodes, str } = this.state;
    const { language, dispatch } = this.props;

    return (
      <div>
        <p>{str}</p>

        <select
          className="select-language"
          value={language}
          onChange={e => dispatch(e.target.value)}
        >
          {languageCodes.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

LanguagePopup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default LanguagePopup;
