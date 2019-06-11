import React from "react";
import PropTypes from "prop-types";

const LanguagePopup = props => (
  <div>
    <p>What language do you prefer to read with?</p>
    <select
      className="select-language"
      name="language"
      value={props.language}
      onChange={e => props.dispatch(e.target.value)}
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  </div>
);

LanguagePopup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default LanguagePopup;
