import React, { Component } from "react";
import PropTypes from "prop-types";

import { googleTranslate } from "../utils/googleTranslate";

class LanguagePopup extends Component {
  state = { languageCodes: [] };

  componentDidMount() {
    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };

    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      getLanguageCodes(languageCodes);
    });
  }

  render() {
    const { languageCodes } = this.state;
    const { language, dispatch } = this.props;
    return (
      <div>
        <p>What language do you prefer to read with?</p>
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
