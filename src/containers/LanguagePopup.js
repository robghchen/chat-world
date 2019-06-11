import { connect } from "react-redux";
import LanguagePopupComponent from "../components/LanguagePopup";
import { changeLanguage } from "../actions";
import { cookies } from "../utils/cookies";

const mapDispatchToProps = dispatch => ({
  dispatch: language => {
    cookies.set("language", language, { path: "/" });
    dispatch(changeLanguage(language));
  }
});

export const LanguagePopup = connect(
  state => ({ language: state.language }),
  mapDispatchToProps
)(LanguagePopupComponent);
