import * as types from "../constants/ActionTypes";
import { cookies } from "../utils/cookies";

if (!cookies.get("language")) {
  cookies.set("language", "en", { path: "/" });
}

const language = (state = cookies.get("language"), action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};
export default language;
