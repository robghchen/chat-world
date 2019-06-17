import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cookie from "react-cookies";
import { parse } from "querystring";

import { langCodes } from "../utils/translate";

class SelectLanguage extends Component {
  state = {
    languageCodes: langCodes,
    language: cookie.load("language") ? cookie.load("language") : "en"
  };

  componentDidMount() {
    if (!cookie.load("language")) {
      cookie.save("language", "en", { path: "/" });
    }
  }

  render() {
    const { languageCodes, language } = this.state;

    return (
      <div>
        <select
          className="select-language"
          value={language}
          onChange={e => this.changeHandler(e.target.value)}
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

  changeHandler = languageSelected => {
    const { language } = this.state;

    if (language !== languageSelected) {
      this.setState({ language: languageSelected });
      cookie.save("language", languageSelected, { path: "/" });
    }
  };
}

export default SelectLanguage;
