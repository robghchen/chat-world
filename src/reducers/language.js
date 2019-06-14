import * as types from "../constants/ActionTypes";
import  cookie  from "react-cookies";

if (!cookies.get("language")) {
  cookies.set("language", "en", { path: "/" });
}

const language = (state = cookie.load("language"), action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};
export default language;
