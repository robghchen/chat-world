import { connect } from "react-redux";
import LanguagePopupComponent from "../components/LanguagePopup";
import { changeLanguage } from "../actions";

const mapDispatchToProps = dispatch => ({
  dispatch: language => {
    dispatch(changeLanguage(language));
  }
});

export const LanguagePopup = connect(
  () => ({}),
  mapDispatchToProps
)(LanguagePopupComponent);
