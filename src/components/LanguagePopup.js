import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  googleTranslate,
  maybeTranslate,
  translate
} from "../utils/googleTranslate";
import { cookies } from "../utils/cookies";

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

  componentDidUpdate() {
    let { str } = this.state;

    googleTranslate.detectLanguage(str, function(err, detection) {
      if (detection.language !== cookies.get("language")) {
        googleTranslate.translate(str, cookies.get("language"), function(
          err,
          translation
        ) {
          str = translation.translatedText;
          translating(str);
        });
      }
    });

    const translating = str => {
      if (str !== this.state.str) {
        this.setState({ str });
      }
    };
  }

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
