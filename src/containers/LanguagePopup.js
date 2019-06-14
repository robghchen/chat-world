import { connect } from "react-redux";
import LanguagePopupComponent from "../components/LanguagePopup";
import { changeLanguage } from "../actions";
import  cookie  from "react-cookies";

const mapDispatchToProps = dispatch => ({
  dispatch: language => {
    cookie.save("language", language, { path: "/" });
    dispatch(changeLanguage(language));
  }
});

export const LanguagePopup = connect(
  state => ({ language: state.language }),
  mapDispatchToProps
)(LanguagePopupComponent);
